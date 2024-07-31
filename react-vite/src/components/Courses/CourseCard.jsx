import { useNavigate } from "react-router-dom"

export default function CourseCard({ course, font, theme }) {
    const navigate = useNavigate();

    return (<>
        {course &&
            <div className={`flex gap-15 column acenter jcenter padding-15 h100 font-${font} ${theme}`}>
                <div className="flex gap-15">
                    <p>Subject:</p>
                    <p className={`link ${theme} no-dec`} onClick={() => navigate(`/courses/${course.id}`)}>{course.title}</p>
                    <p>{course.level}</p>
                </div>
                <div className="course-image-container">
                    <img onClick={() => navigate(`/courses/${course.id}`)} src={course.image} className={`course-image link ${theme} no-dec`} />
                </div>
                <div className="flex gap-10">
                    <p>Teacher:</p>
                    <p>{course.teacher.name}</p>
                </div>
                <a href={`mailto:${course.teacher.email}`} className={`link ${theme} no-dec`}>{course.teacher.email}</a>
            </div>}
    </>)
}
