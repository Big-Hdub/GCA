from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Setting(db.Model):
    __tablename__ = 'settings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('profile_images.id')), nullable=False, default=1)
    theme = db.Column(db.String(6), nullable=False, default='dark')
    role = db.Column(db.String(10), nullable=False, default='parent')
    font_size = db.Column(db.String(3), nullable=False, default='20')
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    user = db.relationship('User', back_populates='settings', )

    image = db.relationship('ProfileImage', back_populates='settings')

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'image': self.image.url,
            'theme': self.theme,
            'role': self.role,
            'font_size': self.font_size
        }

    def to_dict_session(self):
        return {
            'image': self.image.url,
            'theme': self.theme,
            'role': self.role,
            'font_size': self.font_size
        }
