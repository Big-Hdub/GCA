"""creating migrations

Revision ID: 8a3c2995fc30
Revises:
Create Date: 2024-07-25 22:11:15.237922

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '8a3c2995fc30'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('courses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('teacher_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('level', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['teacher_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE courses SET SCHEMA {SCHEMA};")

    op.create_table('course_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=1500), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE course_images SET SCHEMA {SCHEMA};")

    op.create_table('courses_images',
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.Column('image_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['courses.id'], ),
    sa.ForeignKeyConstraint(['image_id'], ['course_images.id'], ),
    sa.PrimaryKeyConstraint('course_id', 'image_id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE courses_images SET SCHEMA {SCHEMA};")

    op.create_table('profile_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=1500), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE profile_images SET SCHEMA {SCHEMA};")

    op.create_table('students',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('grade_level', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE students SET SCHEMA {SCHEMA};")

    op.create_table('student_courses',
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['courses.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.PrimaryKeyConstraint('course_id', 'student_id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE student_courses SET SCHEMA {SCHEMA};")

    op.create_table('curriculums',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.Column('lesson', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('text', sa.String(length=1500), nullable=False),
    sa.Column('type', sa.String(length=20), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['courses.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE curriculums SET SCHEMA {SCHEMA};")

    op.create_table('families',
    sa.Column('parent_id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['parent_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.PrimaryKeyConstraint('parent_id', 'student_id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE families SET SCHEMA {SCHEMA};")

    op.create_table('grades',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.Column('grade', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['courses.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE grades SET SCHEMA {SCHEMA};")

    op.create_table('settings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('image_id', sa.Integer(), nullable=False),
    sa.Column('theme', sa.String(length=6), nullable=False),
    sa.Column('role', sa.String(length=10), nullable=False),
    sa.Column('font_size', sa.String(length=3), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['image_id'], ['profile_images.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE settings SET SCHEMA {SCHEMA};")

    op.create_table('student_curriculums',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('curriculum_id', sa.Integer(), nullable=False),
    sa.Column('complete', sa.Boolean(), nullable=False),
    sa.Column('assigned', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['curriculum_id'], ['curriculums.id'], ),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE student_curriculums SET SCHEMA {SCHEMA};")

    op.create_table('curriculum_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('curriculum_id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=1500), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['curriculum_id'], ['curriculums.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == 'production':
        op.execute(f"ALTER TABLE curriculum_images SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('curriculum_images')
    op.drop_table('student_curriculums')
    op.drop_table('student_courses')
    op.drop_table('settings')
    op.drop_table('grades')
    op.drop_table('families')
    op.drop_table('curriculums')
    op.drop_table('students')
    op.drop_table('profile_images')
    op.drop_table('courses_images')
    op.drop_table('course_images')
    op.drop_table('courses')
    op.drop_table('users')
    # ### end Alembic commands ###
