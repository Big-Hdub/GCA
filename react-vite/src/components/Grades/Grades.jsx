import { removeGrades, thunkGetGrade } from "../../redux/grade";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './Grades.css';


export default function Grades() {
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const role = useSelector((store) => store.session.user)?.settings.role;
    const sessionUser = useSelector((store) => store.session.user);
    const data = useSelector((store) => store.grades.data)?.grades;
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
            dispatch(removeGrades())
        }
    })

    useEffect(() => {
        dispatch(thunkGetGrade())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <div>
            {isLoaded && data && <>
                <div className={`flex column between ${theme}1`}>
                    <Header main={true} />
                    <main id="main-container" className="flex minh100 gap-60">
                        <Sidebar selection='grades' />
                        <div id="grades-container" className={`flex column gap-25 astart padding-40 ${theme} font-${font} ${theme}2`}>
                            <div className="flex column gap-15">
                                {role === 'student' && data.map((grade) => {
                                    return (
                                        <div key={`grade:${grade.id}`} className="flex gap-40">
                                            <div className="flex between gap-10 w500">
                                                <p>{grade.title}:</p>
                                                <p>{grade.completion.filter(lesson => lesson[0].complete).length} / {grade.completion.filter(lesson => lesson[0].assigned).length} assignments completed</p>
                                            </div>
                                            <div className="flex gap-15">
                                                <p>Current grade:</p>
                                                <p>{grade.grade === '0' ? 'Not graded yet' : grade.grade}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </main>
                </div>
                <Footer />
            </>}
        </div>
    )
}
