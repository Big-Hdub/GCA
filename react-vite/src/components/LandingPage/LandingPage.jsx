import { useDispatch, useSelector } from "react-redux";
import { removeAccounts } from "../../redux/account";
import { removeCourses } from "../../redux/course";
import { removeGrades } from "../../redux/grade";
import { useNavigate } from "react-router-dom";
import { removeDash } from "../../redux/dash";
import { useEffect } from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Footer from "../Footer";
// import Header from "./Header";
import './Landing.css';


export default function LandingPage() {
    const sessionUser = useSelector((store) => store.session.user);
    const courses = useSelector((store) => store.courses.courses);
    const account = useSelector((store) => store.account.data);
    const grades = useSelector((store) => store.grades.data);
    const dash = useSelector((store) => store.dash.dash);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionUser) {
            navigate('/dashboard');
        } else {
            if (dash) {
                dispatch(removeDash());
            }
            if (courses) {
                dispatch(removeCourses());
            }
            if (account) {
                dispatch(removeAccounts());
            }
            if (grades) {
                dispatch(removeGrades());
            }
        }
    }, [dispatch, navigate, sessionUser, dash, courses, account, grades]);

    return (<>
        {!sessionUser && <div className='flex column landing'>
            {/* <Header /> */}
            <main className="flex column">
                <h1 id="landing-header" className="aselfcenter mtop-80">Welcome to Garden City Academy</h1>
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Footer landing={true} />
            </main>
        </div>}
    </>
    );
}
