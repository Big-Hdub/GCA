from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class UserCurriculum(db.Model):
    __tablename__ = 'user_curriculums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    curriculum_id = db.Column(db.Integer, nullable=False, default=1)
    complete = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'teacher': self.user.to_dict(),
            'image': self.image.url,
            'title': self.title,
        }
