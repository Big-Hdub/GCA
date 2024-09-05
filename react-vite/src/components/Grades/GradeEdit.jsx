import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateGrade } from "../../redux/grade";

export default function GradeEdit({ grade, gradeId, studentId }) {
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const [currentGrade, setCurrentGrade] = useState(grade);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(thunkUpdateGrade(JSON.stringify({ grade: currentGrade }), gradeId, studentId));
    }

    return (<>
        <select className={`selpad10 ${theme}1 ${theme} font-${font}`}
            onChange={(e) => setCurrentGrade(e.target.value)}
            value={currentGrade}>
            <option value='A'>A</option>
            <option value='B'>B</option>
            <option value='C'>C</option>
            <option value='D'>D</option>
            <option value='F'>F</option>
            <option value={0}>0</option>
        </select>
        <button className="button" onClick={handleSubmit}>Update grade</button>
    </>)
}
