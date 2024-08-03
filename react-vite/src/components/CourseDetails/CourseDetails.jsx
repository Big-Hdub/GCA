import { removeCourses, thunkGetCourseById } from "../../redux/course";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './CourseDetails.css'

export default function CourseDetails() {
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const sessionUser = useSelector((store) => store.session.user);
    const data = useSelector((store) => store.courses.courses);
    const [isLoaded, setIsLoaded] = useState();
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
            dispatch(removeCourses())
        }
    }, [navigate, dispatch, sessionUser])

    useEffect(() => {
        const loadDash = async () => {
            await dispatch(thunkGetCourseById(+courseId))
                .then(setIsLoaded(true))
        }
        loadDash()
    }, [dispatch, courseId])

    return (<>
        {sessionUser &&
            <div>
                <div className={`flex column between ${theme}1`}>
                    <Header main={true} />
                    <main id="main-container" className="flex minh100 gap-60">
                        {isLoaded && data?.course && <>
                            <Sidebar selection='courses' course={data.course.title} />
                            <div id="course-container" className={`flex column gap-40 ${theme} font-${font} ${theme}2`}>
                                <h1>Assignments for {data.course.title}</h1>
                                {data.lessons.filter((lesson) => lesson.assigned).map((lesson) => {
                                    return (
                                        <div key={`lesson:${lesson.id}`} className="flex gap-25">
                                            <p className={`link`} onClick={() => navigate(`/lessons/${lesson.id}`)}>{lesson.title}</p>
                                            <p>{lesson.type}</p>
                                            <p>{lesson.complete ? "Completed" : "Not complete"}</p>
                                        </div>
                                    )
                                })}
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
