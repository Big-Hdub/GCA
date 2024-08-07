import { removeDash, thunkGetDash } from "../../redux/dash";
import { useDispatch, useSelector } from "react-redux";
import { removeCourses } from "../../redux/course";
import { removeLessons } from "../../redux/lesson";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './Dashboard.css'


export default function Dashboard() {
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const role = useSelector((store) => store.session.user)?.settings.role;
    const sessionUser = useSelector((store) => store.session.user);
    const data = useSelector((store) => store.dash.dash);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
            dispatch(removeDash())
        }
    }, [dispatch, navigate, theme, sessionUser])

    useEffect(() => {
        dispatch(removeCourses);
        dispatch(removeLessons);
        if (!data) {
            const loadDash = async () => {
                await dispatch(thunkGetDash())
                    .then(setIsLoaded(true));
            }
            loadDash()
        } else if (data) {
            setIsLoaded(true);
        }
    }, [dispatch, data])

    useEffect(() => { }, [data])

    return (<>
        {sessionUser &&
            <div>
                <div className={`flex column between ${theme}1`}>
                    <Header main={true} />
                    <main id="main-container" className={`flex minh100 gap-60`}>
                        <Sidebar selection='dashboard' />
                        {isLoaded &&
                            <div id="dashboard-container" className={`flex column gap-40 acenter ${theme} font-${font}`}>
                                <h1 id="dashboard-welcome">Welcome {sessionUser.name}</h1>
                                <div id="dashboard-verse-container" className={`flex column gap-10 ${theme}2`}>
                                    <p id="dashboard-verse" className={`${theme} `}>Therefore, as God&apos;s chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.  Bear with each other and forgive one another if any of you has a grievance against someone.  Forgive as the Lord forgave you.  And over all these virtues put on love, which binds them all together in perfect unity.</p>
                                    <p className={`${theme} aselfend`}>Colossians 3:12-14</p>
                                </div>
                                {role === 'new' &&
                                    <h2 id="dashboard-lessons-title" className="aselfstart">Administration action needed to assign your role.  Please contact staff for help.</h2>}
                                {role === 'student' && <>
                                    <h2 id="dashboard-lessons-title" className="aselfstart">Lessons for you to complete today:</h2>
                                    <div id="dashboard-cards-container" className={`flex gap-15 ${theme}2`}>
                                        <div id="dashboard-content" className="flex gap-15">
                                            {data?.map((lesson) => {
                                                return (
                                                    <div key={`student:lesson:${lesson.lesson}title:${lesson.title}`} className={`dashboard-content-card ${theme}3`}>
                                                        <DashboardCard lesson={lesson} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </>}
                                {role === 'parent' && <>
                                    <h2 id="dashboard-lessons-title" className="aselfstart">Lessons assigned to your {data?.length > 1 ? 'children' : 'child'}:</h2>
                                    {data && data[0].lessons?.length && data?.map(({ student, lessons }) => {
                                        return (
                                            <div key={`child:${student?.id}`}>
                                                {lessons && <>
                                                    <h2 className="student-names mbotton-15 aselfstart">{student?.name}</h2>
                                                    <div id="dashboard-cards-container" className={`flex gap-15 ${theme}2`}>
                                                        <div id="dashboard-content" className="flex gap-15">
                                                            {lessons?.map((lessonData) => {
                                                                const [complete, lesson] = [...lessonData]
                                                                return (
                                                                    <div key={`parent:lesson:${lesson.lesson}title:${lesson.title}`} className={`dashboard-content-card ${theme}3`}>
                                                                        <DashboardCard lesson={lesson} complete={complete} font={font} theme={theme} />
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </>}
                                            </div>
                                        )
                                    })}
                                </>}
                                {role === 'teacher' && <>
                                    <h2 id="dashboard-lessons-title" className="aselfstart">Lessons assigned to your {data?.courses.length > 1 ? 'students' : 'student'}:</h2>
                                    {data && data.courses && data.courses.map((course) => {
                                        return (
                                            <div className="flex column wp100" key={`course:${course.id}`}>
                                                <p className="course-names">Course: {course.title} {course.level}</p>
                                                {course.students.map(({ student, lessons }) => {
                                                    return (
                                                        <div className="flex column wp100" key={`child:${student?.id}`}>
                                                            {lessons && <>
                                                                <h2 className="student-names mbotton-15 aselfstart">{student?.name}</h2>
                                                                <div className={`dashboard-cards-container flex gap-15 ${theme}2`}>
                                                                    <div className="dashboard-content between acenter flex gap-15">
                                                                        {lessons?.filter(lesson => lesson[2].course === course.title).map((lessonData) => {
                                                                            const [complete, assigned, lesson] = [...lessonData]
                                                                            return (
                                                                                <div key={`teacher:lesson:${lesson.lesson}title:${lesson.title}`} className={`dashboard-content-card ${theme}3`}>
                                                                                    <DashboardCard lesson={lesson} complete={complete} font={font} theme={theme} teacher={true} assigned={assigned} />
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </>}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </>}
                            </div>
                        }
                    </main>
                </div >
                <Footer />
            </div >}
    </>)
}
