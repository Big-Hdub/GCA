import { removeLessons, thunkCompleteLesson, thunkGetLessonById } from "../../redux/lesson";
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import RenderMarkdown from "../RenderMarkdown";
import { useEffect, useState } from "react";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './LessonDetails.css'

export default function LessonDetails() {
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const sessionUser = useSelector((store) => store.session.user);
    const course = useSelector((store) => store.courses.courses);
    const lesson = useSelector((store) => store.lessons.lessons);
    const [isLoaded, setIsLoaded] = useState();
    const { lessonId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
            dispatch(removeLessons());
        }
    }, [navigate, dispatch, sessionUser]);

    useEffect(() => {
        const loadDash = async () => {
            await dispatch(thunkGetLessonById(+lessonId))
                .then(setIsLoaded(true));
        }
        loadDash();
    }, [dispatch, lessonId]);

    return (<>
        {sessionUser &&
            <div>
                <div className={`flex column between ${theme}1`}>
                    <Header main={true} />
                    <main id="main-container" className="flex minh100 gap-60">
                        {isLoaded && lesson && course && <>
                            <Sidebar selection='lesson' course={course.course} lesson={+lessonId} lessons={course.lessons} />
                            <div id="lesson-container" className={`flex column gap-40 ${theme} font-${font} ${theme}2`}>
                                <RenderMarkdown text={lesson.text} />
                                {lesson.complete ? <p className="aselfend">Complete</p> : <button onClick={() => dispatch(thunkCompleteLesson(+lessonId))} className="button wfit aselfend">Mark as complete</button>}
                            </div>
                        </>}
                    </main>
                </div >
                <Footer />
            </div >}
    </>)
}
