import { useModal } from "../../context/Modal";
import { thunkDeleteCourse } from "../../redux/course";
import { useDispatch } from "react-redux";


function ConfirmModal({ theme, navigate, courseId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClick = async (e, confirmDelete = false) => {
        e.preventDefault();
        if (confirmDelete) {
            await dispatch(thunkDeleteCourse(courseId));
            navigate();
            window.scroll(0, 0);
        }
        closeModal();
    };

    return (
        <div className={`flex column acenter padding-15 gap-15 ${theme ? theme : ''}`}>
            <h2>Are you sure you want to delete this course?</h2>
            <div className="flex gap-15 aselfend">
                <button className="button red" onClick={(e) => handleClick(e, true)}>yes</button>
                <button className="button" onClick={(e) => handleClick(e)}>no</button>
            </div>
        </div>
    );
}

export default ConfirmModal;
