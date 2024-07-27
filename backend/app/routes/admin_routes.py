from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from ..utils.db import db
from ..models import Admin
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

admin_blueprint = Blueprint('admin', __name__)

@admin_blueprint.route('/signup', methods=['POST'])
def signup_admin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    existing_admin = Admin.query.filter_by(email=email).first()
    if existing_admin:
        return jsonify({'message': 'Admin already exists'}), 409

    hashed_password = generate_password_hash(password)
    new_admin = Admin(email=email, password=hashed_password)
    db.session.add(new_admin)
    db.session.commit()
    return jsonify({'message': 'Admin created successfully'}), 201

@admin_blueprint.route('/login', methods=['POST'])
def login_admin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    admin = Admin.query.filter_by(email=email).first()
    if admin and check_password_hash(admin.password, password):
        print(admin.adminid)
        additional_claims = {'role': 'admin'}
        access_token = create_access_token(identity=admin.adminid, additional_claims=additional_claims)
        refresh_token = create_refresh_token(identity=admin.adminid, additional_claims=additional_claims)
        return jsonify({'message': 'Login successful', 'admin_id': admin.adminid, 'access_token':access_token, 'refresh_token':refresh_token}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401
    
@admin_blueprint.route('/verify/admin', methods=['GET'])
@jwt_required()
def verify_admin():
    admin_id = get_jwt_identity()
    admin = Admin.query.filter_by(adminid=admin_id).first()
    if admin:
        return jsonify({'message': 'Admin verified', 'admin_id': admin_id}), 200
    else:
        return jsonify({'message': 'Admin not verified'}), 401
