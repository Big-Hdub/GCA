from app.models import db, User, Setting, ProfileImage, Student, environment, SCHEMA
from sqlalchemy.sql import text


image={'url': '/cross.jpg'}
data=[
    {
    'username':'Demoadmin', 'email':'demoAdmin@aa.io', 'password':'password', 'age':69, 'first_name':'Demo', 'last_name':'Admin', 'role':'admin', 'theme': 'dark'
    },
    {
    'username':'Demoteacher', 'email':'demoTeacher@aa.io', 'password':'password', 'age':45, 'first_name':'Demo', 'last_name':'Teacher', 'role':'teacher'
    },
    {
    'username':'Demoparent', 'email':'demoParent@aa.io', 'password':'password', 'age':35, 'first_name':'Demo', 'last_name':'Family', 'role':'parent', 'theme': 'dark'
    },
    {
    'username':'Demoparent2', 'email':'demoParent2@aa.io', 'password':'password', 'age':35, 'first_name':'Demo2', 'last_name':'Family', 'role':'parent'
    },
    {
    'username':'Demostudent', 'email':'demoStudent@aa.io', 'password':'password', 'age':12, 'first_name':'Demo', 'last_name':'Family', 'role':'student', 'theme': 'dark', 'grade':5
    },
    {
    'username':'BobbieS', 'email':'bobbie@aa.io', 'password':'password', 'age':45, 'first_name':'Bobbie', 'last_name':'Smith', 'role':'parent'
    },
    {
    'username':'SandyS', 'email':'sandy@aa.io', 'password':'password', 'age':45, 'first_name':'Sandy', 'last_name':'Smith', 'role':'parent', 'theme': 'dark'
    },
    {
    'username':'MarnieS', 'email':'marnie@aa.io', 'password':'password', 'age':12, 'first_name':'Marnie', 'last_name':'Smith', 'role':'student', 'grade': 6
    },
    ]

def seed_users():
    existingImage=ProfileImage.query.filter(ProfileImage.url==image['url']).first()
    db.session.flush()
    if existingImage:
        pass
    else:
        default_image=ProfileImage(**image)
        db.session.add(default_image)
        db.session.flush()
    for info in data:
        user = User(username=info['username'], email=info['email'], password=info['password'], age=info['age'], first_name=info['first_name'], last_name=info['last_name'])
        db.session.add(user)
        db.session.flush()
        setting = Setting(user_id=user.id)
        if 'theme' in info.keys():
            setting.theme=info['theme']
        setting.role=info['role']
        db.session.add(setting)
        if info['role']=='student':
            student = Student(user_id=user.id, grade_level=info['grade'])
            user.students.append(student)
            db.session.add(student)
            db.session.flush()
            parents = User.query.filter(User.last_name==user.last_name, User.id!=student.user_id)
            for parent in parents:
                parent.children.append(student)
        user.settings.append(setting)
    db.session.commit()

def undo_users():
    for info in data:
        user = User.query.filter(User.username==info['username']).first()
        if user:
            db.session.delete(user)
        db.session.flush()
    db.session.commit()
