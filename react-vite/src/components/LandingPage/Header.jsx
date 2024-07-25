import { useNavigate } from 'react-router-dom';
import ProfileButton from "../ProfileButton"

export default function Header({ construction, main }) {
    const navigate = useNavigate();
    return (
        <header className='flex w100 between acenter'>
            {main ? <>
                <div className="link"
                    onClick={() => navigate('/dashboard')}>
                    <img id='header-logo'
                        src="/logo.png" />
                </div >
                <ProfileButton />
            </> : <>
                {construction ?
                    <div className="link"
                        onClick={() => navigate('/')}>
                        <img id='header-logo'
                            src="/logo.png" />
                    </div> : <div>
                        <img id='header-logo'
                            src="/logo.png" />
                    </div>
                }
                <h1 id="landing-header">
                    Welcome to Garden City Academy</h1>
                <ProfileButton />
            </>
            }
        </header >
    )
}
