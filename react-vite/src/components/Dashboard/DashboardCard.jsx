import { useNavigate } from "react-router-dom"

export default function DashboardCard({ lesson }) {
    const navigate = useNavigate();

    return (
        <div className="flex gap-15 column acenter jcenter h100">
            <h2>Subject: {lesson.course}</h2>
            <h2 className="link" onClick={() => navigate(`/lessons/${lesson.id}`)}>{lesson.title}</h2>
            <h2>{lesson.type}</h2>
        </div>
    )
}
