from flask_login import current_user, login_required
from app.models import User, db, Setting, Student
from app.forms.signup_form import SignUpForm
from flask import Blueprint, request

from app.models.profile_image import ProfileImage

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/settings', methods=['PUT'])
@login_required
def user_settings(id):
    """
    Update a users settings
    """
    user = User.query.get(id)
    if user:
        if 'theme' in request.json:
            user.settings[0].theme='dark' if user.settings[0].theme=='light' else 'light'
        if 'font' in request.json:
            user.settings[0].font_size = int(request.json['font'])
        if 'profile-image' in request.json:
            url=str(request.json['profile-image'])
            new_image=ProfileImage(url=url)
            user.settings[0].image=new_image
        db.session.commit()
    return user.to_dict_session()


@user_routes.route('', methods=['POST'])
@login_required
def add_child():
    """
    Create a student user as a child of parent
    """
    user = User.query.get(current_user.id)
    if user:
        form = SignUpForm()
        if form.data['level']:
            level = form.data['level']
            del form['level']
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            child_user = User(
                age=form.data['age'],
                first_name=form.data['first_name'],
                last_name=form.data['last_name'],
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password']
            )
            settings = Setting(
                user_id=child_user.id,
                role='student'
                )
            child_user.settings.append(settings)
            student = Student(
                user_id=child_user.id,
                grade_level=level
            )
            child_user.students.append(student)
            user.children.append(student)
            db.session.add(child_user)
            db.session.commit()
            return child_user.to_dict()
        return form.errors, 401
