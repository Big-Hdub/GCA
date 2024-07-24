from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Course(db.Model):
    __tablename__ = 'courses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    teacher = db.Column(db.Integer, nullable=False)
    image_id = db.Column(db.Integer, nullable=False, default=1)
    title = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'teacher': self.user.to_dict(),
            'image': self.image.to_dict(),
            'title': self.title,
        }
