import { useDispatch, useSelector } from "react-redux";
import { thunkGetDash } from "../../redux/dash";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './Dashboard.css'
import DashboardCard from "./DashboardCard";


export default function Dashboard() {
    const sessionUser = useSelector((store) => store.session.user);
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const role = useSelector((store) => store.session.user)?.settings.role;
    const data = useSelector((store) => store.dash.dash);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
        }
    }, [navigate, theme, sessionUser])

    useEffect(() => {
        const loadDash = async () => {
            await dispatch(thunkGetDash())
                .then(setIsLoaded(true))
        }
        loadDash()
    }, [dispatch])

    return (<>
        {(isLoaded && sessionUser) &&
            <div>
                <div className={`flex column between ${theme}1`}>
                    <Header main={true} />
                    <main id="main-container" className={`flex minh100 gap-60`}>
                        <Sidebar selection='dashboard' />
                        <div id="dashboard-container" className={`flex column gap-40 acenter ${theme}`}>
                            <h1 id="dashboard-welcome">Welcome {sessionUser.name}</h1>
                            <div id="dashboard-verse-container" className={`flex column gap-10 ${theme}2`}>
                                <p id="dashboard-verse" className={`${theme} `}>Therefore, as God&apos;s chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.  Bear with each other and forgive one another if any of you has a grievance against someone.  Forgive as the Lord forgave you.  And over all these virtues put on love, which binds them all together in perfect unity.</p>
                                <p className={`${theme} aselfend`}>Colossians 3:12-14</p>
                            </div>
                            {role === 'new' &&
                                <h2 id="dashboard-lessons-title" className="aselfstart">Administration action needed to assign your role.  Please contact staff for help.</h2>}
                            {role === 'student' && <>
                                <h2 id="dashboard-lessons-title" className="aselfstart">Lessons to complete today:</h2>
                                <div id="dashboard-cards-container" className={`flex gap-15 ${theme}2`}>
                                    <div id="dashboard-content" className="flex gap-15">
                                        {data?.map((lesson) => {
                                            return (
                                                <div key={`lesson:${lesson.lesson}title:${lesson.title}`} className={`dashboard-content-card ${theme}3`}>
                                                    <DashboardCard lesson={lesson} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>}
                        </div>
                    </main>
                </div>
                <Footer />
            </div>}
    </>)
}
