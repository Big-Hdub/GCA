from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Grade(db.Model):
    __tablename__ = 'grades'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.Integer, nullable=False)
    grade = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'student': self.user.to_dict(),
            'course': self.course.to_dict(),
            'grade': self.grade,
        }
