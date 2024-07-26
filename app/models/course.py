from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models.student import StudentCourses
from sqlalchemy.sql import func


CoursesImages = db.Table('courses_images',
    db.Column('course_id', db.Integer, db.ForeignKey(add_prefix_for_prod('courses.id')), primary_key=True),
    db.Column('image_id', db.Integer, db.ForeignKey(add_prefix_for_prod('course_images.id')), primary_key=True),
    )

if environment == 'production':
    CoursesImages.schema = SCHEMA


class Course(db.Model):
    __tablename__ = 'courses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    teacher = db.relationship('User', back_populates='courses')

    images = db.relationship('CourseImage', secondary=CoursesImages, back_populates='courses')

    grades = db.relationship('Grade', back_populates='courses', cascade='all, delete-orphan')

    students = db.relationship('Student', secondary=StudentCourses, back_populates='courses')

    curriculum = db.relationship('Curriculum', back_populates='course')

    def to_dict(self):
        return {
            'id': self.id,
            'teacher': self.user.to_dict(),
            'image': self.image.to_dict(),
            'title': self.title,
        }
