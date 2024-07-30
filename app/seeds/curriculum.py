from app.models import curriculum, db, Course, Student, Curriculum, CurriculumImage, environment, SCHEMA
from sqlalchemy.sql import text

from app.models.student_curriculum import StudentCurriculum

mathLessonData = [
    {
        'subject': 'Math',
        'lesson': 1,
        'title': 'Introduction to Algebra',
        'text': '''
# Introduction to Algebra

Algebra is the part of mathematics in which letters and symbols are used to represent numbers and quantities in formulas and equations.

## Basic Concepts
- **Variables**: Symbols used to represent numbers.
- **Constants**: Fixed values.
- **Expressions**: Combinations of variables and constants.

### Example
Consider the expression: \(3x + 5\)

Here, \(x\) is the variable, and \(3\) and \(5\) are constants.
        ''',
        'type': 'lesson'
    },
    {
        'subject': 'Math',
        'lesson': 2,
        'title': 'Solving Linear Equations',
        'text': '''
# Solving Linear Equations

A linear equation is an equation between two variables that gives a straight line when plotted on a graph.

## Steps to Solve
1. **Simplify both sides of the equation**: Combine like terms.
2. **Isolate the variable**: Get the variable on one side of the equation.

### Example
Solve for \(x\) in the equation: \(2x + 3 = 7\)

1. Subtract 3 from both sides: \(2x = 4\)
2. Divide both sides by 2: \(x = 2\)
        ''',
        'type': 'lesson'
    },
    {
        'subject': 'Math',
        'lesson': 3,
        'title': 'Quiz on Algebra Basics',
        'text': '''
# Quiz on Algebra Basics

1. What is the value of \(x\) in the equation \(4x - 5 = 11\)?
    - A) 2
    - B) 4
    - C) 5
    - D) 6

2. Simplify the expression \(3(a + 4) - 2a\).
    - A) \(3a + 12\)
    - B) \(a + 12\)
    - C) \(a + 4\)
    - D) \(a + 8\)

3. If \(y = 3\) and \(z = 4\), find the value of \(2y + z\).
    - A) 10
    - B) 11
    - C) 12
    - D) 13
        ''',
        'type': 'quiz'
    },
    {
        'subject': 'Math',
        'lesson': 4,
        'title': 'Introduction to Geometry',
        'text': '''
# Introduction to Geometry

Geometry is the branch of mathematics concerned with the properties and relations of points, lines, surfaces, and solids.

## Basic Concepts
- **Point**: A location in space.
- **Line**: A straight one-dimensional figure.
- **Plane**: A flat two-dimensional surface.

### Example
Consider a triangle with vertices \(A\), \(B\), and \(C\).

Here, \(A\), \(B\), and \(C\) are points, and the sides of the triangle are lines.
        ''',
        'type': 'lesson'
    },
    {
        'subject': 'Math',
        'lesson': 5,
        'title': 'Quiz on Geometry Basics',
        'text': '''
# Quiz on Geometry Basics

1. Which of the following is a point?
    - A) A location with no dimensions
    - B) A straight one-dimensional figure
    - C) A flat two-dimensional surface
    - D) A three-dimensional object

2. How many sides does a triangle have?
    - A) 2
    - B) 3
    - C) 4
    - D) 5

3. What is the sum of the interior angles of a triangle?
    - A) 90 degrees
    - B) 180 degrees
    - C) 270 degrees
    - D) 360 degrees
        ''',
        'type': 'quiz'
    }
]
englishLessonData = [
    {
        'subject': 'English',
        'lesson': 1,
        'title': 'Introduction to Grammar',
        'text': '''
# Introduction to Grammar

Grammar is the set of structural rules that govern the composition of clauses, phrases, and words in any given natural language.

## Basic Concepts
- **Nouns**: Words that represent people, places, or things.
- **Verbs**: Words that describe actions or states.
- **Adjectives**: Words that describe nouns.

### Example
Consider the sentence: "The quick brown fox jumps over the lazy dog."

- Nouns: fox, dog
- Verbs: jumps
- Adjectives: quick, brown, lazy
        ''',
        'type': 'lesson'
    },
    {
        'subject': 'English',
        'lesson': 2,
        'title': 'Quiz on Basic Grammar',
        'text': '''
# Quiz on Basic Grammar

1. Identify the noun in the sentence: "The cat slept on the mat."
    - A) slept
    - B) on
    - C) cat
    - D) mat

2. Which word is a verb in the sentence: "She sings beautifully"?
    - A) She
    - B) sings
    - C) beautifully
    - D) none of the above

3. What is the adjective in the sentence: "The red ball bounced"?
    - A) red
    - B) ball
    - C) bounced
    - D) the
        ''',
        'type': 'quiz'
    }
]
readingLessonData = [
    {
        'subject': 'Reading',
        'lesson': 1,
        'title': 'Understanding Themes',
        'text': '''
# Understanding Themes

Themes are the central topics or ideas explored in a text.

## Identifying Themes
- Look for recurring subjects or ideas.
- Consider the title and how it relates to the text.
- Pay attention to the characters' development and the resolution of the story.

### Example
In "To Kill a Mockingbird," themes include racial injustice and moral growth.
        ''',
        'type': 'lesson'
    },
    {
        'subject': 'Reading',
        'lesson': 2,
        'title': 'Quiz on Themes',
        'text': '''
# Quiz on Themes

1. Which of the following could be a theme in a story about a boy who learns to be brave?
    - A) Friendship
    - B) Bravery
    - C) Happiness
    - D) Wealth

2. What theme might you find in a story about a girl who overcomes many obstacles to achieve her dreams?
    - A) Persistence
    - B) Betrayal
    - C) Greed
    - D) Fear

3. If a story repeatedly shows characters making sacrifices for others, what is a likely theme?
    - A) Love
    - B) Sacrifice
    - C) Justice
    - D) Freedom
        ''',
        'type': 'quiz'
    }
]
geographyLessonData = [
    {
        'subject': 'Geography',
        'lesson': 1,
        'title': 'Introduction to Maps',
        'text': '''
# Introduction to Maps

Maps are visual representations of an area that show geographic features, boundaries, and significant landmarks.

## Types of Maps
- **Political Maps**: Show countries, states, and cities.
- **Physical Maps**: Highlight physical features like mountains and rivers.
- **Thematic Maps**: Focus on specific themes like climate or population density.

### Example
A physical map of the United States shows the Rocky Mountains and the Mississippi River.
        ''',
        'type': 'lesson'
    },
    {
        'subject': 'Geography',
        'lesson': 2,
        'title': 'Quiz on Maps',
        'text': '''
# Quiz on Maps

1. What type of map would you use to find the capital cities of countries?
    - A) Physical map
    - B) Political map
    - C) Thematic map
    - D) Climate map

2. Which map shows physical features like mountains and rivers?
    - A) Political map
    - B) Physical map
    - C) Thematic map
    - D) Road map

3. What does a thematic map show?
    - A) Physical features
    - B) Political boundaries
    - C) Specific themes or subjects
    - D) None of the above
        ''',
        'type': 'quiz'
    }
]
historyLessonData = [
    {
        'subject': 'History',
        'lesson': 1,
        'title': 'Introduction to Ancient Civilizations',
        'text': '''
# Introduction to Ancient Civilizations

Ancient civilizations are societies that developed complex structures and cultural achievements in ancient times.

## Notable Ancient Civilizations
- **Mesopotamia**: Known as the "Cradle of Civilization."
- **Ancient Egypt**: Famous for its pyramids and pharaohs.
- **Ancient Greece**: Known for its philosophy and democracy.

### Example
The ancient Egyptians built the Pyramids of Giza as tombs for their pharaohs.
        ''',
        'type': 'lesson'
    },
    {
        'subject': 'History',
        'lesson': 2,
        'title': 'Quiz on Ancient Civilizations',
        'text': '''
# Quiz on Ancient Civilizations

1. Which ancient civilization is known as the "Cradle of Civilization"?
    - A) Ancient Egypt
    - B) Ancient Greece
    - C) Mesopotamia
    - D) Ancient Rome

2. What are the Pyramids of Giza?
    - A) Ancient temples
    - B) Tombs for pharaohs
    - C) Fortresses
    - D) Schools

3. Which civilization is known for its philosophy and democracy?
    - A) Mesopotamia
    - B) Ancient Greece
    - C) Ancient Rome
    - D) Ancient Egypt
        ''',
        'type': 'quiz'
    }
]
bibleStudyLessonData = [
    {
        'subject': 'Bible time',
        'lesson': 1,
        'title': 'Introduction to the Bible',
        'text': '''
# Introduction to the Bible

The Bible is a collection of sacred texts or scriptures.

## Structure of the Bible
- **Old Testament**: Contains books like Genesis, Exodus, and Psalms.
- **New Testament**: Contains books like the Gospels and Revelation.

### Example
The book of Genesis in the Old Testament describes the creation of the world.
        ''',
        'type': 'lesson'
    },
    {
        'subject': 'Bible time',
        'lesson': 2,
        'title': 'Quiz on the Bible',
        'text': '''
# Quiz on the Bible

1. What are the two main sections of the Bible?
    - A) Genesis and Exodus
    - B) Psalms and Proverbs
    - C) Old Testament and New Testament
    - D) Gospels and Letters

2. Which book describes the creation of the world?
    - A) Exodus
    - B) Genesis
    - C) Revelation
    - D) Psalms

3. What is the last book of the New Testament?
    - A) Acts
    - B) Romans
    - C) Revelation
    - D) Hebrews
        ''',
        'type': 'quiz'
    }
]
data = [mathLessonData, englishLessonData, readingLessonData, historyLessonData, geographyLessonData, bibleStudyLessonData]
urls = {'Math': '/math.png', 'English': '/english.png', 'Reading': '/reading.png', 'Geography': '/geography.png', 'History': '/history.png', 'Bible time': '/bible.png'}

def seed_curriculums():
    students = Student.query.all()
    db.session.flush()
    for info in data:
        for lessonInfo in info:
            subject, lesson, title, text, type = lessonInfo.values()
            curriculum = Curriculum.query.filter(Curriculum.lesson==lesson, Curriculum.title==title, Curriculum.text==text, Curriculum.type==type).first()
            db.session.flush()
            if curriculum:
                pass
            else:
                courses = Course.query.filter(Course.title==subject)
                db.session.flush()
                for course in courses:
                    if course:
                        curriculum = Curriculum.query.filter(Curriculum.course_id==course.id, Curriculum.lesson==lesson, Curriculum.title==title).first()
                        db.session.flush()
                        if curriculum:
                            pass
                        else:
                            curriculum = Curriculum(course_id=course.id, lesson=lesson, title=title, text=text, type=type)
                            course.curriculum.append(curriculum)
                            db.session.commit()
                        image = CurriculumImage.query.filter(CurriculumImage.curriculum_id==curriculum.id).first()
                        db.session.flush()
                        if image:
                            pass
                        else:
                            image = CurriculumImage(curriculum_id=curriculum.id, url=urls[subject])
                            curriculum.images.append(image)
                            db.session.commit()
                        if lesson==1:
                            for student in students:
                                if course.level==student.grade_level:
                                    student_curriculum = StudentCurriculum(student_id=student.id, curriculum_id=curriculum.id, complete=False, assigned=True)
                                    student.complete.append(student_curriculum)
                                    db.session.commit()
                                else:
                                    pass
                        else:
                            for student in students:
                                if not course.level==student.grade_level:
                                    student_curriculum = StudentCurriculum(student_id=student.id, curriculum_id=curriculum.id, complete=False, assigned=False)
                                    student.complete.append(student_curriculum)
                                    db.session.commit()
                                else:
                                    pass
    db.session.commit()



def undo_curriculums():
    for info in data:
        for lessonInfo in info:
            curriculum = Curriculum.query.filter(Curriculum.lesson==lessonInfo['lesson']).first()
            if curriculum:
                db.session.delete(curriculum)
            db.session.flush()
        db.session.commit()
