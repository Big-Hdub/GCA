from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Curriculum(db.Model):
    __tablename__ = 'curriculums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('courses.id')), nullable=False)
    lesson = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    text = db.Column(db.String(1500), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    course = db.relationship('Course', back_populates='curriculum')

    images = db.relationship('CurriculumImage', back_populates='curriculum')

    complete = db.relationship('StudentCurriculum', back_populates='curriculum')

    def to_dict(self):
        return {
            'id': self.id,
            'course': self.course.to_dict(),
            'image': self.image.to_dict(),
            'lesson': self.lesson,
            'title': self.title,
            'text': self.text,
            'type': self.type,
        }
