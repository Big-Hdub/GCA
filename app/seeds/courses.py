from app.models import db, User, Course, Student, Grade, CourseImage, environment, SCHEMA
from sqlalchemy.sql import text


courseUrls = {'Math': '/math.png', 'English': '/english.png', 'Reading': '/reading.png', 'Geography': '/geography.png', 'History': '/history.png', 'Bible time': '/bible.png'}
subjects = [['Math', 6], ['Math', 5], ['English', 6], ['English', 5], ['Reading', 5], ['Reading', 6], ['Geography', 5], ['Geography', 6], ['History', 5], ['History', 6], ['Bible time', 5], ['Bible time', 6]]

def seed_courses():
    for url in courseUrls.values():
        image = CourseImage.query.filter(CourseImage.url==url).first()
        db.session.flush()
        if image:
            pass
        else:
            image = CourseImage(url=url)
            db.session.add(image)
            db.session.commit()
    teacher=User.query.filter(User.username=='Demoteacher').first()
    db.session.flush()
    if teacher:
        for [subject, grade] in subjects:
            course = Course(title=subject, level=grade, teacher_id=teacher.id)
            teacher.courses.append(course)
            db.session.commit()
            image = CourseImage.query.filter(CourseImage.url==courseUrls[subject]).first()
            db.session.flush()
            if image:
                image.courses.append(course)
                db.session.commit()
            students = Student.query.filter(Student.grade_level==grade)
            db.session.flush()
            for student in students:
                student.courses.append(course)
                db.session.commit()
                grade = Grade(student_id=student.id, course_id=course.id, grade='0')
                student.grades.append(grade)
                db.session.commit()
    db.session.commit()

def undo_courses():
    for [subject, grade] in subjects:
        course = Course.query.filter(Course.title==subject, Course.level==grade).first()
        if course:
            db.session.delete(course)
        db.session.flush()
    db.session.commit()
