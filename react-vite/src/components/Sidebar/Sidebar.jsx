import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { removeCourses } from '../../redux/course';
import { useDispatch } from 'react-redux';

export default function Sidebar({ selection, course, lesson, lessons }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async (url, func) => {
        if (func) await func();
        window.scroll(0, 0);
        navigate(url)
    }

    return (<>
        {selection === 'dashboard' &&
            <div id="sidebar" className="flex column gap-10">
                <div id="sidebar-selection">
                    <p className="sidebar-links link mleft-25">Dashboard</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/courses')} className="sidebar-links link mleft-25">Courses</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/account')} className="sidebar-links link mleft-25">Account</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/grades')} className="sidebar-links link mleft-25">Grades</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/settings')} className="sidebar-links link mleft-25">Settings</p>
                </div>
            </div>
        }
        {selection === 'courses' &&
            <div id="sidebar" className="flex column gap-10">
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/dashboard')} className="sidebar-links link mleft-25">Dashboard</p>
                </div>
                {course ?
                    <div className="sidebar-not-selected flex column gap-25">
                        <p onClick={() => handleClick('/courses', async () => await dispatch(removeCourses()))} className="sidebar-links link mleft-25">Courses</p>
                        <div id='sidebar-selection'>
                            <p className="sidebar-title mleft-50">{course}</p>
                        </div>
                    </div> :
                    <div id="sidebar-selection">
                        <p className="sidebar-links link mleft-25">Courses</p>
                    </div>}
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/account')} className="sidebar-links link mleft-25">Account</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/grades')} className="sidebar-links link mleft-25">Grades</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/settings')} className="sidebar-links link mleft-25">Settings</p>
                </div>
            </div>
        }
        {selection === 'lesson' &&
            <div id="sidebar" className="flex column gap-10">
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/dashboard')} className="sidebar-links link mleft-25">Dashboard</p>
                </div>
                <div className="sidebar-not-selected flex column gap-25">
                    <p onClick={() => handleClick('/courses', async () => await dispatch(removeCourses()))} className="sidebar-links link mleft-25">Courses</p>
                    <div className='sidebar-not-selected flex column gap-10'>
                        <p onClick={() => handleClick(`/courses/${course.id}`)} className="sidebar-links link mleft-50">{course.title}</p>
                        {lessons.filter((lesson) => lesson.assigned).map((lessonInfo) => {
                            return (lessonInfo.id === lesson ?
                                <div key={`lesson:${lessonInfo.id}`} id='sidebar-selection'>
                                    <p className="sidebar-title mleft-75">{lessonInfo.title}</p>
                                </div>
                                :
                                <div key={`lesson:${lessonInfo.id}`} className="sidebar-not-selected">
                                    <p onClick={() => handleClick(`/lessons/${lessonInfo.id}`)} className="sidebar-links link mleft-75">{lessonInfo.title}</p>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/account')} className="sidebar-links link mleft-25">Account</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/grades')} className="sidebar-links link mleft-25">Grades</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/settings')} className="sidebar-links link mleft-25">Settings</p>
                </div>
            </div>
        }
        {selection === 'account' &&
            <div id="sidebar" className="flex column gap-10">
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/dashboard')} className="sidebar-links link mleft-25">Dashboard</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/courses')} className="sidebar-links link mleft-25">Courses</p>
                </div>
                <div id="sidebar-selection">
                    <p className="sidebar-links link mleft-25">Account</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/grades')} className="sidebar-links link mleft-25">Grades</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/settings')} className="sidebar-links link mleft-25">Settings</p>
                </div>
            </div>
        }
        {selection === 'grades' &&
            <div id="sidebar" className="flex column gap-10">
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/dashboard')} className="sidebar-links link mleft-25">Dashboard</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/courses')} className="sidebar-links link mleft-25">Courses</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/account')} className="sidebar-links link mleft-25">Account</p>
                </div>
                <div id="sidebar-selection">
                    <p className="sidebar-links link mleft-25">Grades</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/settings')} className="sidebar-links link mleft-25">Settings</p>
                </div>
            </div>
        }
        {selection === 'settings' &&
            <div id="sidebar" className="flex column gap-10">
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/dashboard')} className="sidebar-links link mleft-25">Dashboard</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/courses')} className="sidebar-links link mleft-25">Courses</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/account')} className="sidebar-links link mleft-25">Account</p>
                </div>
                <div className='sidebar-not-selected'>
                    <p onClick={() => handleClick('/grades')} className="sidebar-links link mleft-25">Grades</p>
                </div>
                <div id="sidebar-selection">
                    <p className="sidebar-links link mleft-25">Settings</p>
                </div>
            </div>
        }
    </>
    )
}
