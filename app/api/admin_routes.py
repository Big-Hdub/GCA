from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User
from app.models.course import Course

admin_routes = Blueprint('admin', __name__)

@admin_routes.route('', methods=['GET'])
@login_required
def admin():
    """
    Query and return all users for admin users
    """
    curr_user = User.query.get(current_user.id)
    if curr_user.settings[0].role=='admin':
        users=User.query.all()
        courses=Course.query.all()
        return jsonify({
            'teachers': [user.to_dict() for user in users if user.settings[0].role=='teacher'],
            'parents': [user.to_dict() for user in users if user.settings[0].role=='parent'],
            'students': [user.to_dict_admin_student() for user in users if user.settings[0].role=='student'],
            'courses': [course.to_dict() for course in courses]
            })
