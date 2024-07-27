import { NavLink, useNavigate } from 'react-router-dom';
import './Footer.css'
import { useEffect, useState } from 'react';


export default function Footer({ landing }) {
    const [footClass, setFootClass] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (landing) {
            setFootClass('footer-fill')
        }
    }, [landing, footClass])

    const handleClick = (url) => {
        window.scroll(0, 0);
        navigate(url);
    };

    return (
        <footer className={`flex between ${footClass}`}>
            <div className="flex gap-15">
                <div className="footer-logo" onClick={() => handleClick('/')}></div>
                <p className="link" onClick={() => handleClick('/about')}>about</p>
                <p className="link" onClick={() => handleClick('/team')}>team</p>
                <p className="link" onClick={() => handleClick('/help')}>help</p>
                <p className="link" onClick={() => handleClick('/contact')}>contact us</p>
            </div>
            <div id='social-button-container' className='flex acenter'>
                <div>
                    <NavLink to="https://github.com/Big-Hdub">
                        <button
                            className='button footer-button'>
                            Github
                        </button>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="https://www.linkedin.com/in/harry-wagner-7784a0123/">
                        <button
                            className='button footer-button'>
                            Linkedin
                        </button>
                    </NavLink>
                </div>
            </div>
        </footer>
    );
}
