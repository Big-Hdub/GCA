from flask_login import current_user
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def validate_user(form, field):
    user = User.query.get(current_user.id)
    if not (user or user.settings[0].role=='teacher' or user.settings[0].role=='admin'):
        raise ValidationError('Not authorized to do this.')

def validate_type(form, field):
    print(field.data)
    if not field.data in ['lesson', 'quiz']:
        raise ValidationError('type needs to be either lesson or quiz')

class CreateLesson(FlaskForm):
    title = StringField('title', validators=[DataRequired(), validate_user])
    text = StringField('text', validators=[DataRequired()])
    type = StringField('type', validators=[DataRequired(), validate_type])
