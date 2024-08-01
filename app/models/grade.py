from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Grade(db.Model):
    __tablename__ = 'grades'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('courses.id')), nullable=False)
    grade = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    student = db.relationship('Student', back_populates='grades')

    courses = db.relationship('Course', back_populates='grades')

    def to_dict(self):
        return {
            **self.courses.to_dict(),
            'id': self.id,
            'grade': self.grade,
            'completion': [[complete.to_dict() for complete in curriculum.complete] for curriculum in self.courses.curriculum]
        }
