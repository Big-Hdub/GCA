from .curriculum import seed_curriculums, undo_curriculums
from app.models.db import db, environment, SCHEMA
from .courses import seed_courses, undo_courses
from .users import seed_users, undo_users
from flask.cli import AppGroup


seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_curriculums()
        undo_courses()
        undo_users()
    seed_users()
    seed_courses()
    seed_curriculums()


@seed_commands.command('undo')
def undo():
    undo_curriculums()
    undo_courses()
    undo_users()
