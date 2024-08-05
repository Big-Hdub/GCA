import { useNavigate } from "react-router-dom"

export default function DashboardCard({ lesson, complete, font, theme }) {
    const navigate = useNavigate();

    const clickLesson = (url) => {
        window.scroll(0, 0);
        navigate(url)
    }

    return (<>
        {lesson &&
            <div className={`flex gap-15 column acenter jcenter padding-15 h100 font-${font} ${theme}`}>
                <p>Subject: {lesson.course}</p>
                <p className="link" onClick={() => clickLesson(`/lessons/${lesson.id}`)}>{lesson.title}</p>
                <span className="flex gap-15">
                    <p>{lesson.type}</p>
                    <p>{complete ? 'complete' : 'not complete'}</p>
                </span>
            </div>}
    </>)
}
