from flask_login import current_user
from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def validate_user(form, field):
    user = User.query.get(current_user.id)
    if not (user or user.settings[0].role=='teacher' or user.settings[0].role=='admin'):
        raise ValidationError('Not authorized to do this.')


class CreateCourse(FlaskForm):
    title = StringField('title', validators=[DataRequired(), validate_user])
    level = IntegerField('level', validators=[DataRequired()])
    url = StringField('url', validators=[DataRequired()])
