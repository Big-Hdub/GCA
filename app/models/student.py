from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


family = db.Table('families',
    db.Column('parent_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('student_id', db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), primary_key=True),
    )

if environment == 'production':
    family.schema = SCHEMA


class Student(db.Model):
    __tablename__ = 'students'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    grade_level = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'course': self.course_id,
            'grade_level': self.grade_level
        }
