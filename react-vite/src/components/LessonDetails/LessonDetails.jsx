import { removeLessons, thunkGetLessonById } from "../../redux/lesson";
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './LessonDetails.css'
import RenderMarkdown from "../RenderMarkdown/RenderMarkdown";

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
                        {isLoaded && lesson && course?.course?.title && <>
                            <Sidebar selection='lesson' course={course.course} lesson={+lessonId} lessons={course.lessons} />
                            <div id="lesson-container" className={`flex column gap-40 ${theme} font-${font} ${theme}2`}>
                                <RenderMarkdown text={lesson.text} />
                            </div>
                        </>}
                    </main>
                </div >
                <Footer />
            </div >}
    </>)
}
