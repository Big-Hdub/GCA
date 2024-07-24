from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Course(db.Model):
    __tablename__ = 'courses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    teacher = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    images = db.relationship('CourseImage', back_populates='course')

    grades = db.relationship('Grade', back_populates='courses')

    student = db.relationship('Student', back_populates='courses')

    curriculum = db.relationship('Curriculum', back_populates='course')

    def to_dict(self):
        return {
            'id': self.id,
            'teacher': self.user.to_dict(),
            'image': self.image.to_dict(),
            'title': self.title,
        }
