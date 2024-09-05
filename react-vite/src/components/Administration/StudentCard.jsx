import { thunkAddCourse, thunkRemoveCourse } from "../../redux/admin";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export default function Student({ student, theme, font, courses }) {
    const [course, setCourse] = useState('');
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


    return (<div key={`student-${student.id}`} className="flex gap-15 acenter between">
        <p>{student.name}:</p>
        <div className="flex gap-15">
            <p>Courses</p>
            <select className={`selpad10 ${theme}1 ${theme} font-${font} w300px`}
                onChange={(e) => setCourse(e.target.value)}
                defaultValue={course}>
                <option value="" disabled>Select a course</option>
                {courses.map((course) =>
                    <option key={`student-${student.id}:course-${+course.id}`}
                        value={+course.id}>
                        {course.title} {course.level}
                    </option>)}
            </select>
            {course !== '' ? <>
                {added ?
                    < button onClick={() => handleClick(true, +course)} className="button red">Remove from class</button> : <div className="w134px">
                        < button onClick={() => handleClick(false, +course)} className="button">Add to class</button></div>}
            </> : <>
                <div className="w134px"></div>
            </>}
        </div>
    </div >)
}
