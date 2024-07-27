from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from ..utils.db import db
from ..models import Player, Team 
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/signup', methods=['POST'])
def signup_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    nickname = data.get('nickname')
    country = data.get('country')
    teamid = data.get('teamid', None)

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    existing_user = Player.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = generate_password_hash(password)
    new_user = Player(email=email, password=hashed_password, nickname=nickname, country=country)
    
    if teamid is not None:
        team = Team.query.get(teamid)
        if team is None:
            return jsonify({'message': 'Invalid team ID'}), 404
        new_user.teamid = teamid  # Only set teamid if it's provided and not None
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201


@user_blueprint.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    user = Player.query.filter_by(email=email).first()
    print(user.userid)
    if user and check_password_hash(user.password, password):
        additional_claims = {'role': 'user'}
        access_token = create_access_token(identity=user.userid, additional_claims=additional_claims)
        refresh_token = create_refresh_token(identity=user.userid, additional_claims=additional_claims)
        return jsonify({'message': 'Login successful', 'user_id': user.userid, 'access_token': access_token, 'refresh_token': refresh_token}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@user_blueprint.route('/verify', methods=['GET'])
@jwt_required()
def verify_user():
    user_id = get_jwt_identity()
    player = Player.query.filter_by(userid=user_id).first()
    if player:
        return jsonify({'message': 'Player verified', 'user_id': user_id}), 200
    else:
        return jsonify({'message': 'Player not verified'}), 401
    
@user_blueprint.route('/api/validate_user/<int:user_id>', methods=['GET'])
def validate_user(user_id):
    user = Player.query.get(user_id)
    if user:
        return jsonify({'message': 'User is valid', 'user_id': user_id}), 200
    else:
        return jsonify({'message': 'User not found'}), 404