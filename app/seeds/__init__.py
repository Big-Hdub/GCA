from flask.cli import AppGroup
from .users import seed_users, undo_users
from .courses import seed_courses, undo_courses

from app.models.db import db, environment, SCHEMA


seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_courses()
        undo_users()
    seed_users()
    seed_courses()


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_courses()
