from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User, Student

account_routes = Blueprint('data', __name__)


@account_routes.route('')
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

@account_routes.route('', methods=['PUT'])
@login_required
def update_account():
    """
    Update account info
    """
    user = User.query.get(current_user.id)
