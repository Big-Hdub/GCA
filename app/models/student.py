from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


Family = db.Table('families',
    db.Column('parent_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('student_id', db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), primary_key=True),
    )

if environment == 'production':
    Family.schema = SCHEMA

StudentCourses = db.Table('student_courses',
    db.Column('course_id', db.Integer, db.ForeignKey(add_prefix_for_prod('courses.id')), primary_key=True),
    db.Column('student_id', db.Integer, db.ForeignKey(add_prefix_for_prod('students.id')), primary_key=True),
    )

if environment == 'production':
    StudentCourses.schema = SCHEMA


class Student(db.Model):
    __tablename__ = 'students'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    grade_level = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    user = db.relationship('User', back_populates='students')

    parents = db.relationship('User', secondary=Family, back_populates='children')

    grades = db.relationship('Grade', back_populates='student', cascade='all, delete-orphan')

    courses = db.relationship('Course', secondary=StudentCourses, back_populates='students')

    complete = db.relationship('StudentCurriculum', back_populates='student', cascade='all, delete-orphan')

    curriculum = db.relationship('Curriculum', overlaps='curriculum,complete,student', secondary=add_prefix_for_prod('student_curriculums'), back_populates='students')
    # if environment == "production":
    #     curriculum = db.relationship('Curriculum', overlaps='curriculum,complete,student', secondary=f'{SCHEMA}.student_curriculums', back_populates='students')

    def to_dict_dash(self):
        return {
            'id': self.id,
            'grade_level': self.grade_level,
            'lessons': [lesson.curriculum.to_dict_dash() for lesson in self.complete if lesson.complete==False]
        }
