import { removeCourses, thunkGetCourseById } from "../../redux/course";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateCourseModal from "../CreateCourseModal";
import OpenModalButton from "../OpenModalButton";
import { useEffect, useState } from "react";
import ConfirmModal from "../ConfirmModal";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './CourseDetails.css'

export default function CourseDetails() {
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const role = useSelector((store) => store.session.user)?.settings.role;
    const sessionUser = useSelector((store) => store.session.user);
    const data = useSelector((store) => store.courses.courses);
    const [isLoaded, setIsLoaded] = useState();
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
            dispatch(removeCourses());
            window.scroll(0, 0);
        }
    }, [navigate, dispatch, sessionUser]);

    useEffect(() => {
        const loadDash = async () => {
            await dispatch(thunkGetCourseById(+courseId))
                .then(setIsLoaded(true));
        }
        loadDash();
    }, [dispatch, courseId]);

    const clickLesson = (url) => {
        window.scroll(0, 0);
        navigate(url);
    }

    return (<>
        {sessionUser &&
            <div>
                <div className={`flex column between ${theme}1`}>
                    <main id="main-container" className="flex minh100 gap-60 mtop-229">
                        {isLoaded && data?.course && <>
                            <Sidebar selection='courses' course={data.course.title} />
                            <div id="course-container" className={`flex column gap-25 ${theme} font-${font} ${theme}2`}>
                                {role == 'student' && <>
                                    <h1>Assignments for {data.course.title}</h1>
                                    {data.lessons.filter((lesson) => lesson.assigned).map((lesson) => {
                                        return (
                                            <div key={`lesson:${lesson.id}`} className="flex gap-25">
                                                <p className={`link`} onClick={() => clickLesson(`/lessons/${lesson.id}`)}>{lesson.title}</p>
                                                <p>{lesson.type}</p>
                                                <p>{lesson.complete ? "Completed" : "Not complete"}</p>
                                            </div>
                                        )
                                    })}
                                </>}
                                {role == 'parent' && <>
                                    <h1>Lessons for {data.course.title} level: {data.course.level}</h1>
                                    {data.lessons.map((lesson) => {
                                        return (
                                            <div key={`lesson:${lesson.id}`} className="flex gap-15">
                                                <p className={`link`} onClick={() => clickLesson(`/lessons/${lesson.id}`)}>{lesson.title}</p>
                                                <p>{lesson.type}</p>
                                            </div>
                                        )
                                    })}
                                </>}
                                {(role == 'teacher' || role == 'admin') && <>
                                    <h1>Lessons for {data.course.title} level: {data.course.level}</h1>
                                    {data.lessons.map((lesson) => {
                                        return (
                                            <div key={`lesson:${lesson.id}`} className="flex gap-15">
                                                <p className={`link`} onClick={() => clickLesson(`/lessons/${lesson.id}`)}>{lesson.title}</p>
                                                <p>{lesson.type}</p>
                                            </div>
                                        )
                                    })}
                                    <div className="aselfend flex gap-15">
                                        <button className="button" onClick={() => navigate(`/courses/${courseId}/lessons/new`)}>Add lesson</button>
                                        <OpenModalButton modalComponent={<CreateCourseModal course={data.course} />} buttonText={'Update course'} />
                                        <OpenModalButton modalComponent={<ConfirmModal theme={theme} navigate={() => navigate('/courses')} courseId={+courseId} />} buttonText={'Delete course'} red={true} />
                                    </div>
                                </>}
                            </div>
                        </>}
                    </main>
                </div >
                <Footer />
            </div >
        }
    </>
    )
}
