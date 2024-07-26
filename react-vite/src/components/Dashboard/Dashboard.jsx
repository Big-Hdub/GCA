import { useNavigate } from "react-router-dom";
import Header from "../LandingPage/Header";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";
import Footer from "../Footer";
import './Dashboard.css'


export default function Dashboard() {
    const sessionUser = useSelector((store) => store.session.user);
    const theme = useSelector((store) => store.session.user).settings.theme;
    const navigate = useNavigate();


    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
        }
    }, [navigate, theme, sessionUser])
    return (
        <div>
            <div className={`flex column between ${theme}1`}>
                <Header main={true} />
                <main id="main-container" className={`flex minh100 gap-60`}>
                    <Sidebar selection='dashboard' />
                    <div id="dashboard-container" className={`flex column gap-40 acenter ${theme}`}>
                        <h1 id="dashboard-welcome">Welcome {sessionUser.name}</h1>
                        <div id="dashboard-verse-container" className={`flex ${theme}2`}>
                            <p id="dashboard-verse">Bible verse of the day.</p>
                        </div>
                        <h2 id="dashboard-lessons-title" className="aselfstart">Lessons to complete today:</h2>
                        <div id="dashboard-cards-container" className={`flex gap-15 ${theme}2`}>
                            <div id="dashboard-content" className="flex gap-15">
                                <div className={`dashboard-content-card ${theme}3`}></div>
                                <div className={`dashboard-content-card ${theme}3`}></div>
                                <div className={`dashboard-content-card ${theme}3`}></div>
                                <div className={`dashboard-content-card ${theme}3`}></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}
