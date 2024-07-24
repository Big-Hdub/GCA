from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class CurriculumImage(db.Model):
    __tablename__ = 'curriculum_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    curriculum_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('curriculums.id')), nullable=False)
    url = db.Column(db.String(1500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    curriculum = db.relationship('Curriculum', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.url,
        }
