from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms import CreateCourse, CreateLesson
from app.models import User, Course, Curriculum, db
from app.models.course_image import CourseImage
from app.models.student_curriculum import StudentCurriculum

courses_routes = Blueprint('courses', __name__)


@courses_routes.route('')
@login_required
def courses():
    """
    Query for all info needed on the courses and returns it in a list of dictionaries
    """
    user = User.query.get(current_user.id)

    if user.settings[0].role=='student':
        return [course.to_dict_courses() for course in user.students[0].courses]

    if user.settings[0].role=='parent':
        return [{'student': child.user.to_dict(),
                'courses': [course.to_dict_courses()
                            for course in child.courses]}
                            for child in user.children]

    if user.settings[0].role=='teacher':
        return [course.to_dict_courses_teacher() for course in user.courses]

@courses_routes.route('/<int:course_id>')
@login_required
def course(course_id):
    """
    Query for all info needed in a course and returns it in a dictionary
    """
    user = User.query.get(current_user.id)

    if user.settings[0].role=='student':
        course = Course.query.get(course_id)
        db.session.flush()
        lessons = StudentCurriculum.query.filter(StudentCurriculum.student_id == user.students[0].id).all()
        lessons = [lesson.to_dict_student_dash() for lesson in lessons]
        return {'course': course.to_dict_courses(), 'lessons': [lesson for lesson in lessons if lesson['courseId']==course_id]}
    if user.settings[0].role=='teacher':
        course = Course.query.get(course_id)
        curriculum = Curriculum.query.filter(Curriculum.course_id == course.id)
        return {'course': course.to_dict_courses_teacher(), 'lessons': [lesson.to_dict_teacher_details() for lesson in curriculum]}
    else:
        course = Course.query.get(course_id)
        curriculum = Curriculum.query.filter(Curriculum.course_id == course.id)
        return {'course': course.to_dict_courses(), 'lessons': [lesson.to_dict_teacher_details() for lesson in curriculum]}

@courses_routes.route('', methods=['POST'])
@login_required
def create_course():
    """
    Create a new Course
    """
    form = CreateCourse()
    user = User.query.get(current_user.id)
    if user.settings[0].role=='teacher':
        form['csrf_token'].data=request.cookies['csrf_token']
        if form.validate_on_submit():
            course=Course.query.filter(Course.title==form.data['title'], Course.level==form.data['level']).first()
            if course:
                return {'server': 'Course Already exists.'}, 403
            course = Course(
                teacher_id=user.id,
                title=form.data['title'],
                level=form.data['level']
            )
            if 'url' in form.data:
                image=CourseImage.query.filter(CourseImage.url==form.data['url']).first()
                if image:
                    course.images.append(image)
                else:
                    image = CourseImage(
                        url=form.data['url']
                    )
                    course.images.append(image)
            else:
                image = CourseImage(url='/math.png')
                course.images.append(image)
            db.session.add(course)
            db.session.commit()
            return course.to_dict()
        else:
            return form.errors, 401
    else:
        return jsonify({ 'message': 'Unauthorized' }), 401

@courses_routes.route('/<int:course_id>', methods=['PUT'])
@login_required
def edit_course(course_id):
    """
    Edit a Course
    """
    form = CreateCourse()
    user = User.query.get(current_user.id)
    if user.settings[0].role=='teacher':
        form['csrf_token'].data=request.cookies['csrf_token']
        if form.validate_on_submit():
            course=Course.query.get(course_id)
            if course:
                course.title=form.data['title']
                course.level=form.data['level']
            else:
                return jsonify({ 'message': 'Course not found' }), 404
            if 'url' in form.data:
                image=CourseImage.query.filter(CourseImage.url==form.data['url']).first()
                if image:
                    if image in course.images:
                        pass
                    else:
                        course.images.append(image)
                else:
                    image = CourseImage(
                        url=form.data['url']
                    )
                    course.images.append(image)
            db.session.add(course)
            db.session.commit()
            return course.to_dict()
        else:
            return form.errors, 401
    else:
        return jsonify({ 'message': 'Unauthorized' }), 401

@courses_routes.route('/<int:course_id>', methods=['DELETE'])
@login_required
def delete_course(course_id):
    """
    Delete a course
    """
    user = User.query.get(current_user.id)
    db.session.flush()
    if user.settings[0].role=='teacher':
        course = Course.query.get(course_id)
        if course:
            db.session.delete(course)
            db.session.commit()
            return jsonify({ 'message': 'Successfully deleted' })
        else:
            return jsonify({ 'message': 'Course not found'}), 404
    return jsonify({ 'message': 'Unauthorized' }), 401

@courses_routes.route('/<int:course_id>/lessons', methods=['POST'])
@login_required
def create_lesson(course_id):
    """
    Create a new Lesson for a course
    """
    form = CreateLesson()
    user = User.query.get(current_user.id)
    if user.settings[0].role=='teacher':
        form['csrf_token'].data=request.cookies['csrf_token']
        if form.validate_on_submit():
            lesson=Curriculum.query.filter(Curriculum.title==form.data['title'], Curriculum.text==form.data['text'], Curriculum.type==form.data['type']).first()
            db.session.flush()
            if lesson:
                return {'server': 'Lesson Already exists.'}, 403
            course=Course.query.get(course_id)
            if course:
                lessons=Curriculum.query.filter(Curriculum.course_id==course_id).all()
                lesson = Curriculum(
                    course_id=course_id,
                    lesson=len(lessons)+1,
                    title=form.data['title'],
                    text=form.data['text'],
                    type=form.data['type']
                )
                [student.curriculum.append(lesson) for student in course.students]
            else:
                return {'server': 'Course not found.'}, 404
            # if 'url' in form.data:
            #     image=CourseImage.query.filter(CourseImage.url==form.data['url']).first()
            #     if image:
            #         course.images.append(image)
            #     else:
            #         image = CourseImage(
            #             url=form.data['url']
            #         )
            #         course.images.append(image)
            # else:
            #     image = CourseImage(url='/math.png')
            #     course.images.append(image)
            db.session.add(lesson)
            db.session.commit()
            return lesson.to_dict_teacher_details()
        else:
            return form.errors, 401
    else:
        return jsonify({ 'server': 'Unauthorized' }), 401
