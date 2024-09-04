import { useDispatch, useSelector } from "react-redux";
import { thunkGetAdmin } from "../../redux/admin";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './Administration.css';
import Student from "./StudentCard";

export default function Administration() {
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const role = useSelector((store) => store.session.user)?.settings.role;
    const sessionUser = useSelector((store) => store.session.user);
    const data = useSelector((store) => store.admin.data);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(thunkGetAdmin())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/dashboard')
        }
    }, [navigate, role])

    return (<>
        {sessionUser && isLoaded &&
            <div>
                <div className={`flex column between ${theme}1`}>
                    <Header main={true} />
                    <main id="main-container" className={`flex minh100 gap-60`}>
                        <Sidebar selection='administration' />
                        <div id="administration-container" className={`flex column gap-40 padding-40 ${theme} font-${font} ${theme}2`}>
                            <div className={`flex column gap-10 padding-15 ${theme} font-${font} ${theme}3`}>
                                <p>Teachers:</p>
                                {data.teachers.length > 0 && data.teachers.map((teacher) => {
                                    return (<div key={`teacher-${teacher.id}`}>
                                        <p>{teacher.name}</p>
                                    </div>)
                                })}
                            </div>
                            <div className={`flex column gap-10 padding-15 ${theme} font-${font} ${theme}3`}>
                                <p>Parents:</p>
                                {data.parents.length > 0 && data.parents.map((parent) => {
                                    return (<div key={`parent-${parent.id}`}>
                                        <p>{parent.name}</p>
                                    </div>)
                                })}
                            </div>
                            <div className={`flex column gap-10 padding-15 ${theme} font-${font} ${theme}3`}>
                                <p>Students:</p>
                                {data.students.length > 0 &&
                                    data.students.map((student) =>
                                        <Student key={`student-${student.id}`}
                                            student={student}
                                            theme={theme}
                                            font={font}
                                            courses={data.courses.filter((course) =>
                                                course.level === student.gradeLevel)} />)}
                            </div>
                        </div>
                    </main>
                </div>
                <Footer />
            </div >}
    </>)
}
