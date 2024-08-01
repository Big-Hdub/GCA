import { removeCourses, thunkGetCourses } from "../../redux/course";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import CourseCard from "./CourseCard";
import Footer from "../Footer";
import './Courses.css'


export default function Courses() {
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const role = useSelector((store) => store.session.user)?.settings.role;
    const sessionUser = useSelector((store) => store.session.user);
    const data = useSelector((store) => store.courses.courses);
    const [isLoaded, setIsLoaded] = useState();
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
            await dispatch(thunkGetCourses())
                .then(setIsLoaded(true))
        }
        loadDash()
    }, [dispatch])

    return (<>
        {isLoaded &&
            <div>
                <div className={`flex column between ${theme}1`}>
                    <Header main={true} />
                    <main id="main-container" className="flex minh100 gap-60">
                        <Sidebar selection='courses' />
                        <div id="courses-container" className={`flex wrap gap-40 acenter ${theme} font-${font} ${theme}2`}>
                            {role === 'student' && <>
                                {data?.map(course => {
                                    return (
                                        <div key={`course:${course.id}`} className={`course-content-cards ${theme}3`}>
                                            <CourseCard course={course} font={font} theme={theme} />
                                        </div>
                                    )
                                })}
                            </>}
                            {role === 'parent' && <>
                                {data?.map(({ student, courses }) => {
                                    return (
                                        <div key={`child:${student?.id}`} className="flex column gap-40">
                                            <p className="aselfstart">{student.name}</p>
                                            <div className={`flex wrap gap-40 acenter`}>
                                                {
                                                    courses.map((course) => {
                                                        return (
                                                            <div key={`course:${course.id}`} className={`course-content-cards ${theme}3`}>
                                                                <CourseCard course={course} font={font} theme={theme} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </>}
                        </div>
                    </main>
                </div >
                <Footer />
            </div >
        }
    </>
    )
}
