import { thunkAddCourse, thunkRemoveCourse } from "../../redux/admin";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export default function Student({ student, theme, font, courses }) {
    const [course, setCourse] = useState(student.courses[0].id);
    const [added, setAdded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const len = student.courses.filter((c) => +c.id === +course)?.length
        if (len === 1) setAdded(true)
        else setAdded(false)
    }, [course, setCourse, student])

    const handleClick = (type, courseId) => {
        if (type) {
            dispatch(thunkRemoveCourse(student.id, courseId))
        } else {
            dispatch(thunkAddCourse(student.id, courseId))
        }
    }


    return (<div key={`student-${student.id}`} className="flex gap-15 acenter">
        <p>{student.name}:</p>
        <p>Courses</p>
        <select className={`selpad10 ${theme}1 ${theme} font-${font} w300px`}
            onChange={(e) => setCourse(e.target.value)}
            defaultValue={course}>
            {courses.map((course) =>
                <option key={`student-${student.id}:course-${+course.id}`}
                    value={+course.id}>
                    {course.title} {course.level}
                </option>)}
        </select>
        {added ?
            < button onClick={() => handleClick(true, +course)} className="button red">Remove from class</button> :
            < button onClick={() => handleClick(false, +course)} className="button">Add to class</button>}
    </div >)
}
