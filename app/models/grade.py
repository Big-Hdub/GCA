from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Grade(db.Model):
    __tablename__ = 'grades'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('courses.id')), nullable=False)
    grade = db.Column(db.String(255), nullable=False, default='0')
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    student = db.relationship('Student', back_populates='grades')

    courses = db.relationship('Course', back_populates='grades')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.courses.title,
            'level': self.courses.level,
            'grade': self.grade,
            'course': self.course_id
        }
