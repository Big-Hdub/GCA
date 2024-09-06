import { useDispatch, useSelector } from "react-redux";
import { thunkGetGrade } from "../../redux/grade";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import GradeEdit from "./GradeEdit";
import Footer from "../Footer";
import './Grades.css';


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
                    {isLoaded && data &&
                        <div id="grades-container" className={`flex column gap-25 astart padding-40 ${theme} font-${font} ${theme}2`}>
                            <div className="flex column gap-40">
                                {role === 'student' && data.grades.map(({ grade, title, id, course }) => {
                                    return (
                                        <div key={`grade:${id}`} className="flex gap-40">
                                            <div className="flex between gap-10 w575">
                                                <p>{title}:</p>
                                                <p>{data.complete.filter(lesson => lesson.complete && lesson.course === course).length} / {data.complete.filter(lesson => lesson.assigned && lesson.course === course).length} assignments completed</p>
                                            </div>
                                            <div className="flex gap-15">
                                                <p>Current grade:</p>
                                                <p>{grade === '0' ? 'Not graded yet' : grade}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                                {role === 'parent' && <>
                                    {!data.children?.length && <div className={`flex padding-40 column gap-15 ${theme}2`}>
                                        <h1>No children linked to your account yet.</h1>
                                        <p>Add children to get started.</p>
                                        <p>To add children navigate to the account tab in the sidebar.</p>
                                    </div>}
                                    {data.children?.length > 0 && data.children.map(({ child, complete, grades }) => {
                                        return (
                                            <div className="flex column gap-15" key={`child:${child.id}`}>
                                                <p>{child.name}</p>
                                                {!grades.length && <div className={`flex padding-40 column gap-15 ${theme}2`}>
                                                    <h1>Child not assigned to courses yet.</h1>
                                                    <p>Contact administration to sign up for courses.</p>
                                                </div>}
                                                {grades.length > 0 && grades.map(({ grade, title, id, course }) => {
                                                    return (
                                                        <div key={`grade:${id}`} className="flex gap-40">
                                                            <div className="flex between gap-10 w575">
                                                                <p>{title}:</p>
                                                                <p>{complete.filter(lesson => lesson.complete && lesson.course === course).length} / {complete.filter(lesson => lesson.assigned && lesson.course === course).length} assignments completed</p>
                                                            </div>
                                                            <div className="flex gap-15">
                                                                <p>Current grade:</p>
                                                                <p>{grade === '0' ? 'Not graded yet' : grade}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </>}
                                {(role === 'teacher' || role === 'admin') && data.courses.map(({ course, students }) => {
                                    return (
                                        <div className="flex column gap-15" key={`course:${course.id}`}>
                                            <div className="flex gap-15 between">
                                                <p>Subject: {course.title}</p>
                                                <p>Level: {course.level}</p>
                                            </div>
                                            <div className={`flex column gap-10 padding-15 ${theme}3`}>
                                                {students.map(({ complete, grade, student }) => {
                                                    return (
                                                        <div className="flex wrap between gap-25 acenter" key={`student:${student.id}`}>
                                                            <p>{student.name}</p>
                                                            <div className="flex gap-60 acenter">
                                                                <p>Lessons: {complete.filter((i) => i.complete).length} complete / {complete.filter((i) => i.assigned === true).length} assigned</p>
                                                                <p>current grade: {grade[0].grade}</p>
                                                                <div className="flex gap-15 acenter">
                                                                    <GradeEdit grade={grade[0].grade} gradeId={grade[0].id} />
                                                                </div>
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
                    }
                </main>
            </div>
            <Footer />
        </div>
    )
}
