import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ selection }) {
    const navigate = useNavigate();

    const handleClick = (url) => {
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
                <div id="sidebar-selection">
                    <p className="sidebar-links link mleft-25">Courses</p>
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
