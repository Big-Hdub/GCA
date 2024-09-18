import { removeLessons, thunkCompleteLesson, thunkGetLessonById } from "../../redux/lesson";
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import RenderMarkdown from "../RenderMarkdown";
import { useEffect, useState } from "react";
import ConfirmModal from "../ConfirmModal";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './LessonDetails.css'

export default function LessonDetails() {
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const role = useSelector((store) => store.session.user)?.settings.role;
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
        const loadLesson = async () => {
            await dispatch(thunkGetLessonById(+lessonId))
                .then(setIsLoaded(true));
        }
        loadLesson();
    }, [dispatch, lessonId]);

    return (<>
        {sessionUser &&
            <div>
                <div className={`flex column between ${theme}1`}>
                    <main id="main-container" className="flex minh100 gap-60 mtop-229 ">
                        {isLoaded && lesson && course?.course?.title && <>
                            {role === 'student' && <>
                                <Sidebar selection='lesson' course={course.course} lesson={+lessonId} lessons={course.lessons} />
                                <div id="lesson-container" className={`flex column gap-40 ${theme} font-${font} ${theme}2`}>
                                    <div className="flex between acenter">
                                        <h1>{lesson.title}</h1>
                                        <p>{lesson.type}</p>
                                    </div>
                                    <RenderMarkdown text={lesson.text} />
                                    {lesson.complete ? <p className="aselfend">Complete</p> : <button onClick={() => dispatch(thunkCompleteLesson(+lessonId))} className="button wfit aselfend">Mark as complete</button>}
                                </div>
                            </>}
                            {role === 'parent' && <>
                                {lesson.children && <>
                                    <Sidebar selection='lesson' course={course.course} lesson={+lessonId} lessons={course.lessons} />
                                    <div id="lesson-container" className={`flex column gap-40 ${theme} font-${font} ${theme}2`}>
                                        <div className="flex between acenter">
                                            <h1>{lesson.children[0][0]?.title}</h1>
                                            <p>{lesson.children[0][0]?.type}</p>
                                        </div>
                                        <RenderMarkdown text={lesson.children[0][0]?.text} />
                                        {lesson.children.map((child) => {
                                            return (<div key={`child:${child[0].id}`} className="flex aselfend">
                                                {child[0].complete ? <p className="aselfend">{child[0].student.name}: Complete</p> :
                                                    <div className="flex aselfend acenter gap-10">
                                                        <p>{child[0].student.name}: </p>
                                                        <button onClick={() => dispatch(thunkCompleteLesson(+lessonId, child = child[0].student.id))} className="button wfit aselfend">Mark as complete</button>
                                                    </div>}
                                            </div>)
                                        })}
                                    </div>
                                </>}
                            </>}
                            {(role === 'teacher' || role === 'admin') && <>
                                <Sidebar selection='lesson' course={course.course} lesson={+lessonId} lessons={course.lessons} teacher={true} />
                                <div id="lesson-container" className={`flex column gap-40 ${theme} font-${font} ${theme}2`}>
                                    <div className="flex between acenter">
                                        <h1>{lesson.title}</h1>
                                        <p>{lesson.type}</p>
                                    </div>
                                    <RenderMarkdown text={lesson.text} />
                                    <div className="aselfend flex gap-15">
                                        <button className="button" onClick={() => navigate(`/courses/${course.course.id}/lessons/${lessonId}/edit`)}>Edit lesson</button>
                                        <OpenModalButton modalComponent={<ConfirmModal theme={theme} navigate={() => navigate(`/courses/${course.course.id}`)} lessonId={+lessonId} />} buttonText={'Delete lesson'} red={true} />
                                    </div>
                                </div>
                            </>}
                        </>}
                    </main>
                </div >
                <Footer />
            </div >}
    </>)
}
