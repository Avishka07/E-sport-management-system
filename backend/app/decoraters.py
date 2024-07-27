from functools import wraps
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request, get_jwt
from .models import Admin, Player
from flask import jsonify

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        
        verify_jwt_in_request()  # Verify the JWT is present and valid
        claims = get_jwt()
        admin_id = claims['sub']
        if claims.get('role') != 'admin':
            return jsonify({'message': 'Admin privileges required'}), 403
        admin = Admin.query.filter_by(adminid=admin_id).first()
        if not admin:
            return jsonify({'message': 'Admin not found'}), 404
        return fn(*args, **kwargs)
    return wrapper


def user_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt()
        user_id = claims['sub']
        if claims.get('role') != 'user':
            return jsonify({'message': 'User privileges required'}), 403
        user = Player.query.filter_by(userid=user_id).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404
        return fn(*args, **kwargs)
    return wrapper