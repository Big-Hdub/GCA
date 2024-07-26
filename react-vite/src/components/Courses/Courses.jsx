import { useNavigate } from "react-router-dom";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Footer from "../Footer";
import './Courses.css'


export default function Courses() {
    const sessionUser = useSelector((store) => store.session.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
        }
    })
    return (
        <div>
            <div className='flex column between theme-main-background'>
                <Header main={true} />
                <main id="main-container" className="flex minh100 gap-60">
                    <Sidebar selection='courses' />
                    <div id="courses-container" className="flex gap-15">


                        <div id="courses-content" className="flex gap-15">
                            <div className="courses-content-card"></div>
                            <div className="courses-content-card"></div>
                            <div className="courses-content-card"></div>
                            <div className="courses-content-card"></div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}
