import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { thunkAssignLesson } from "../../redux/lesson";

export default function DashboardCard({ lesson, complete, font, theme, parent, teacher, assigned, student }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clickLesson = (url) => {
        window.scroll(0, 0);
        navigate(url)
    }

    return (<>
        {lesson && !parent && !teacher &&
            <div className={`flex gap-15 column acenter jcenter padding-15 h100 font-${font} ${theme}`}>
                <p>Subject: {lesson.course}</p>
                <p className="link" onClick={() => clickLesson(`/lessons/${lesson.id}`)}>{lesson.title}</p>
                <span className="flex gap-15">
                    <p>{lesson.type}</p>
                    <p>{complete ? 'complete' : 'not complete'}</p>
                </span>
            </div>}
        {lesson && parent &&
            <div className={`flex wrap gap-15 acenter font-${font} ${theme}`}>
                <p className="link" onClick={() => clickLesson(`/lessons/${lesson.id}`)}>{lesson.title}</p>
                <p>{complete ? 'complete' : 'not complete'}</p>
            </div>}
        {lesson && teacher &&
            <div className={`flex wrap gap-15 acenter font-${font} ${theme}`}>
                <p className="link" onClick={() => clickLesson(`/lessons/${lesson.id}`)}>{lesson.title}</p>
                <p>{complete ? 'complete' : 'not complete'}</p>
                {assigned ? <p>assigned</p> : <p className="link" onClick={() => dispatch(thunkAssignLesson(lesson.id, student))}>assign</p>}
            </div>}
    </>)
}
