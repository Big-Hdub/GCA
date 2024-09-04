import { thunkGetGrade } from "../../redux/grade";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './Grades.css';
import GradeEdit from "./GradeEdit";


export default function Grades() {
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const role = useSelector((store) => store.session.user)?.settings.role;
    const sessionUser = useSelector((store) => store.session.user);
    const data = useSelector((store) => store.grades.data);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
        }
    })

    useEffect(() => {
        dispatch(thunkGetGrade())
            .then(() => setIsLoaded(true))
        setIsLoaded(true)
    }, [dispatch])

    return (
        <div>
            <div className={`flex column between ${theme}1`}>
                <Header main={true} />
                <main id="main-container" className="flex minh100 gap-60">
                    <Sidebar selection='grades' />
                    {isLoaded && data && <>
                        <div id="grades-container" className={`flex column gap-25 astart padding-40 ${theme} font-${font} ${theme}2`}>
                            <div className="flex column gap-40">
                                {role === 'student' && data.grades.map((grade) => {
                                    return (
                                        <div key={`grade:${grade.id}`} className="flex gap-40">
                                            <div className="flex between gap-10 w575">
                                                <p>{grade.title}:</p>
                                                <p>{grade.completion.filter(lesson => lesson[0].complete && lesson[0].assigned).length} / {grade.completion.filter(lesson => lesson[0].assigned).length} assignments completed</p>
                                            </div>
                                            <div className="flex gap-15">
                                                <p>Current grade:</p>
                                                <p>{grade.grade === '0' ? 'Not graded yet' : grade.grade}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                                {role === 'parent' && data.children.map((child) => {
                                    return (
                                        <div className="flex column gap-15" key={`child:${child.child.id}`}>
                                            <p>{child.child.name}</p>
                                            {child.complete.map((grade) => {
                                                return (
                                                    <div key={`grade:${grade.id}`} className="flex gap-40">
                                                        <div className="flex between gap-10 w575">
                                                            <p>{grade.title}:</p>
                                                            <p>{grade.completion.filter(lesson => lesson[0].complete && lesson[0].assigned).length} / {grade.completion.filter(lesson => lesson[0].assigned).length} assignments completed</p>
                                                        </div>
                                                        <div className="flex gap-15">
                                                            <p>Current grade:</p>
                                                            <p>{grade.grade === '0' ? 'Not graded yet' : grade.grade}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                                {(role === 'teacher' || role === 'admin') && data.courses.map(({ course, students }) => {
                                    return (
                                        <div className="flex column gap-15" key={`course:${course.id}`}>
                                            <div className="flex gap-15 between">
                                                <p>Subject: {course.title}</p>
                                                <p>Level: {course.level}</p>
                                            </div>
                                            <div className={`padding-15 ${theme}3`}>
                                                {students.map(({ complete, student }) => {
                                                    return (
                                                        <div className="flex wrap gap-25 acenter" key={`student:${student.id}`}>
                                                            <p>{student.name}</p>
                                                            <div key={`complete:${complete[0].id}`}>
                                                                {complete.filter((i) => i.title === course.title && i.level === course.level).map(({ completion, grade, id }) => {
                                                                    return (<div key={`${completion[0][0].id}`} className="flex gap-60 acenter">
                                                                        <p>Lessons: {completion.filter((i) => i[0].complete).length} complete / {completion.filter((i) => i[0].assigned === true).length} assigned</p>
                                                                        <p>current grade: {grade}</p>
                                                                        <div className="flex gap-15 acenter">
                                                                            <GradeEdit grade={grade} gradeId={id} />
                                                                        </div>
                                                                    </div>)
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>}
                </main>
            </div>
            <Footer />
        </div>
    )
}
