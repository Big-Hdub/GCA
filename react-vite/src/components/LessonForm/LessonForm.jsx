import { thunkCreateLesson, thunkEditLesson, thunkGetLessonById } from "../../redux/lesson";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetCourseById } from "../../redux/course";
import { useDispatch, useSelector } from "react-redux";
import RenderMarkdown from "../RenderMarkdown";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './LessonForm.css'

export default function LessonForm({ edit }) {
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const role = useSelector((store) => store.session.user)?.settings.role;
    const sessionUser = useSelector((store) => store.session.user);
    const lesson = useSelector((store) => store.lessons.lessons);
    const course = useSelector((store) => store.courses.courses);
    // const [filePreviews, setFilePreviews] = useState([]);
    const [isLoaded, setIsLoaded] = useState();
    const { courseId, lessonId } = useParams();
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionUser || (role !== 'teacher' && role !== 'admin')) {
            navigate('/');
        }
    }, [navigate, sessionUser, role]);

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data.file_url) {
            const fileResponse = await fetch(`/api/get-file-url/${data.file_url.slice(45)}`)
            if (fileResponse.ok) {
                const fileUrl = await fileResponse.json()
                if (fileUrl) {
                    const url = fileUrl.file_url
                    let extension = url.split('.').pop().toLowerCase();
                    extension = extension.split('?')[0]
                    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
                        setText((prevText) => `${prevText}\n![${'Image'}](${url})`);
                    } else if (['pdf'].includes(extension)) {
                        setText((prevText) => `${prevText}\n[${'View PDF'}](${url})`);
                    } else if (['doc', 'docx'].includes(extension)) {
                        setText((prevText) => `${prevText}\n[${'View Word Document'}](${url})`);
                    }
                }
            }
        } else {
            console.error('File upload failed: ', data.error);
        }
    };

    useEffect(() => {
        if (files.length > 0) {
            files.forEach((file) => handleUpload(file));
            setFiles([]);
        }
    }, [files]);

    useEffect(() => {
        const loadCourse = async () => {
            if (lessonId && title === '' && text === '' && type === '') {
                if (lesson) {
                    setTitle(lesson.title);
                    setText(lesson.text);
                    setType(lesson.type);
                } else {
                    await dispatch(thunkGetLessonById(lessonId))
                }
            } else if (!isLoaded) {
                await dispatch(thunkGetCourseById(+courseId))
                    .then(setIsLoaded(true));
            }
        }
        loadCourse();
    }, [dispatch, courseId, lessonId, title, text, type, isLoaded, lesson])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({})
        let serverResponse = false;
        if (lessonId) {
            serverResponse = await dispatch(
                thunkEditLesson(+lessonId, {
                    title,
                    text,
                    type
                })
            )
        } else {
            serverResponse = await dispatch(
                thunkCreateLesson(+courseId, {
                    title,
                    text,
                    type
                })
            );
        }
        if (serverResponse?.id) {
            navigate(`/lessons/${serverResponse.id}`);
            window.scroll(0, 0);
        } else if (serverResponse) {
            setErrors(serverResponse);
        } else if (lessonId) {
            navigate(`/lessons/${lessonId}`);
            window.scroll(0, 0);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            setText(
                text.substring(0, start) + '    ' + text.substring(end)
            );
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4;
            }, 0)
        }
    }

    return (<>
        {sessionUser && course &&
            <div>
                <div className={`flex column between ${theme}1`}>
                    <main id="main-container" className="flex minh100 gap-60 mtop-229">
                        {edit ? <Sidebar selection='lesson' lesson={+lessonId} course={course.course} lessons={course.lessons} teacher={true} /> : <Sidebar selection='newLesson' course={course.course} lessons={course.lessons} />}
                        {isLoaded && course?.course?.title && <>
                            <div id="lesson-container" className={`flex column wp100 gap-40 ${theme} font-${font} ${theme}2 padding-40 bsbb`}>
                                <form id="create-lesson-form"
                                    className="flex column gap-15" onSubmit={handleSubmit}>
                                    <label>
                                        Title:
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        className={`w575 ${theme}1 ${theme}`}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    {errors.title && <p className="error">{errors.title}</p>}
                                    <label>
                                        Preview:
                                    </label>
                                    <div className={`minh100px flex column gap-25 padding-40 ${theme}1`}>
                                        <RenderMarkdown text={text} />
                                    </div>
                                    <label>
                                        Enter your markdown here:
                                    </label>
                                    <textarea
                                        type="text"
                                        value={text}
                                        onKeyDown={handleKeyPress}
                                        className={`minh100px padding-15 ${theme}1 ${theme}`}
                                        onChange={(e) => setText(e.target.value)}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                    />
                                    {errors.text && <p className="error">{errors.text}</p>}
                                    <label>
                                        Lesson type:
                                    </label>
                                    <div className="w575">
                                        <select
                                            type="text"
                                            defaultValue={type}
                                            onChange={(e) => setType(e.target.value)}
                                        >
                                            <option value="" className="w575" disabled>Select one...</option>
                                            <option value="lesson" className="w575">Lesson</option>
                                            <option value="quiz" className="w575">Quiz</option>
                                        </select>
                                    </div>
                                    {errors.type && <p className="error">{errors.type}</p>}
                                    <button className="button aselfend" type="submit">{lessonId ? 'Update lesson' : 'Create lesson'}</button>
                                </form>
                            </div>
                        </>}
                    </main>
                </div >
                <Footer />
            </div >}
    </>)
}
