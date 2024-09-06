from werkzeug.security import generate_password_hash, check_password_hash
from .db import db, environment, SCHEMA
from flask_login import UserMixin
from sqlalchemy.sql import func
from .student import Family


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.Integer, nullable=False)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    courses = db.relationship('Course', back_populates='teacher', cascade='all, delete-orphan')

    settings = db.relationship('Setting', back_populates='user', cascade='all, delete-orphan')

    students = db.relationship('Student', back_populates='user', cascade='all, delete-orphan')

    children = db.relationship('Student', secondary=Family, back_populates='parents')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.first_name+' '+self.last_name,
            'age': self.age,
            'username': self.username,
            'email': self.email
        }

    def to_dict_session(self):
        return {
            'id': self.id,
            'name': f'{self.first_name} {self.last_name}',
            'age': self.age,
            'username': self.username,
            'email': self.email,
            'settings': self.settings[0].to_dict_session()
        }

    def to_dict_courses(self):
        return {
            'name': self.first_name+' '+self.last_name,
            'email': self.email
        }

    def to_dict_teacher_dash(self):
        return {
            'courses': [course.to_dict_teacher() for course in self.courses],
            }

    def to_dict_admin_student(self):
        return {
            'id': self.id,
            'name': self.first_name+' '+self.last_name,
            'age': self.age,
            'username': self.username,
            'email': self.email,
            'gradeLevel': self.students[0].grade_level,
            **self.students[0].to_dict_admin()
        }
