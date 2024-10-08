import { removeCourses, thunkGetCourses } from "../../redux/course";
import { useDispatch, useSelector } from "react-redux";
import CreateCourseModal from "../CreateCourseModal";
import OpenModalButton from "../OpenModalButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

    return (
        <>
            {sessionUser &&
                <div>
                    <div className={`flex column between ${theme}1`}>
                        <main id="main-container" className="flex minh100 gap-60 mtop-229">
                            <Sidebar selection='courses' />
                            <div id="courses-container" className={`flex wrap gap-40 acenter ${theme} font-${font} ${theme}2`}>
                                {isLoaded && data && <>
                                    {role === 'student' && <>
                                        {data.length && data?.map(course => {
                                            return (
                                                <div key={`course:${course.id}`} className={`course-content-cards ${theme}3`}>
                                                    <CourseCard course={course} font={font} theme={theme} />
                                                </div>
                                            )
                                        })}
                                    </>}
                                    {role === 'parent' && <div className="flex aselfstart wp100">
                                        {!data.length && <div className={`flex padding-40 column gap-15 ${theme}2`}>
                                            <h1>No children linked to your account yet.</h1>
                                            <p>Add children to get started.</p>
                                            <p>To add children navigate to the account tab in the sidebar.</p>
                                        </div>}
                                        {data.length > 0 && data.map(({ student, courses }) => {
                                            return (
                                                <div key={`child:${student?.id}`} className="flex column gap-40 wp100">
                                                    <p className="aselfstart">{student.name}</p>
                                                    <div className={`flex wrap gap-40 acenter`}>
                                                        {!courses.length && <div className={`flex padding-40 column gap-15 ${theme}2`}>
                                                            <h1>Child not assigned to courses yet.</h1>
                                                            <p>Contact administration to sign up for courses.</p>
                                                        </div>}
                                                        {courses.length > 0 && courses.map((course) => {
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
                                    </div>}
                                    {role === 'teacher' && <div className={`flex column gap-25`}>
                                        <OpenModalButton modalComponent={<CreateCourseModal />} buttonText={'Create course'} />
                                        <div className={`flex wrap gap-40 acenter ${theme} font-${font}`}>
                                            {data.length > 0 && data.map(course => {
                                                return (
                                                    <div key={`course:${course.id}`} className={`course-content-cards ${theme}3`}>
                                                        <CourseCard course={course} font={font} theme={theme} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <OpenModalButton modalComponent={<CreateCourseModal />} buttonText={'Create course'} />
                                    </div>}
                                    {role === 'admin' && <div className={`flex column gap-25`}>
                                        {data.length > 0 && data.map(({ teacher, courses }) => {
                                            return (<div key={`teacher:${teacher.id}`} className="flex column gap-25">
                                                <h1>{teacher.name}&apos;s courses:</h1>
                                                <div className={`flex wrap gap-40 acenter ${theme} font-${font}`}>
                                                    {courses.length > 0 && courses.map(course => {
                                                        return (
                                                            <div key={`course:${course.id}`} className={`course-content-cards ${theme}3`}>
                                                                <CourseCard course={course} font={font} theme={theme} />
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>)
                                        })
                                        }
                                    </div>}
                                </>
                                }
                            </div>
                        </main>
                    </div >
                    <Footer />
                </div >
            }
        </>
    )
}
