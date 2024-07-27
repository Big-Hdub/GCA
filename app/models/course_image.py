from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models.course import CoursesImages
from sqlalchemy.sql import func


class CourseImage(db.Model):
    __tablename__ = 'course_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(1500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    courses = db.relationship('Course', secondary=CoursesImages, back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.url,
        }
