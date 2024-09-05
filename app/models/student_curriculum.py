from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class StudentCurriculum(db.Model):
    __tablename__ = 'student_curriculums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), nullable=False)
    curriculum_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('curriculums.id')), nullable=False, default=1)
    complete = db.Column(db.Boolean, nullable=False, default=False)
    assigned = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    student = db.relationship('Student', back_populates='complete')

    curriculum = db.relationship('Curriculum', back_populates='complete')

    def to_dict(self):
        return {
            'id': self.id,
            'complete': self.complete,
            'assigned': self.assigned,
            'course': self.curriculum.course.id
        }

    def to_dict_student_dash(self):
        return {
            'id': self.curriculum_id,
            'complete': self.complete,
            'assigned': self.assigned,
            'courseId': self.curriculum.course.id,
            'course': self.curriculum.course.title,
            'lesson': self.curriculum.lesson,
            'title': self.curriculum.title,
            'type': self.curriculum.type,
        }
