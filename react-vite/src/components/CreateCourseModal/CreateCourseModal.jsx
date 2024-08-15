import { thunkCreateCourse } from "../../redux/course";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./CreateCourse.css";


function CreateCourseModal() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [level, setLevel] = useState("");
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkCreateCourse({
                title,
                level,
                url
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    return (
        <div id="create-course-modal"
            className="flex column gap-15 acenter">
            <div id="create-course-form-logo"></div>
            {errors.server && <p className="error">{errors.server}</p>}
            <form id="create-course-modal-form"
                className="flex column gap-10" onSubmit={handleSubmit}>
                <label>
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <p className="error">{errors.title}</p>}
                <label>
                    Level
                </label>
                <input
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                />
                {errors.level && <p className="error">{errors.level}</p>}
                <label>
                    Image url
                </label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                {errors.url && <p className="error">{errors.url}</p>}
                <button className="button aselfend" type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateCourseModal;
