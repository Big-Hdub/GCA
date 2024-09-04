from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import User, db

account_routes = Blueprint('account', __name__)


@account_routes.route('', methods=['GET'])
@login_required
def account():
    """
    Query for all info needed on the account and returns it as a dictionary
    """
    user = User.query.get(current_user.id)
    if user.settings[0].role=='student':
        return { 'student': user.to_dict(),  'parents': [parent.to_dict() for parent in user.students[0].parents]}

    if user.settings[0].role=='parent':
        return {'children': [child.user.to_dict() for child in user.children],
                'parent': user.to_dict()}

    if user.settings[0].role=='teacher':
        return { 'teacher': user.to_dict() }

    if user.settings[0].role=='admin':
        return { 'admin': user.to_dict() }

@account_routes.route('', methods=['PUT'])
@login_required
def update_account():
    """
    Update account info
    """
    data = request.get_json(force=True, cache=True)
    user = User.query.get(current_user.id)
    if 'firstName' in data:
        user.first_name = data['firstName']
        db.session.commit()
    if 'age' in data:
        user.age = data['age']
        db.session.commit()
    if 'username' in data:
        user.username = data['username']
        db.session.commit()
    if 'email' in data:
        user.email = data['email']
        db.session.commit()
    if 'password' in data:
        if user.check_password(data['password']):
            user.password = data['newPassword']
            db.session.commit()
        else:
            return {'errors': {'password': 'invalid password'}}, 401
    return {'message':'working route and method'}
