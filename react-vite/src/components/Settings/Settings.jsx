import { thunkToggleSettings } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../FileUpload/FileUpload";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './Settings.css'


export default function Settings() {
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const sessionUser = useSelector((store) => store.session.user);
    const [fontSize, setFontSize] = useState(+font);
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelect = () => {
        dispatch(thunkToggleSettings(sessionUser.id, {
            theme: true,
            font: false,
            image: false
        }))
    };

    const newFont = (e) => {
        setFontSize(+e.target.value)
        dispatch(thunkToggleSettings(sessionUser.id, {
            theme: false,
            font: +e.target.value,
            image: false
        }))
    }

    useEffect(() => {
    }, [dispatch])

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
        } else {
            setIsLoaded(true)
        }
    }, [navigate, sessionUser])

    return (<>
        {sessionUser && fontSize &&
            <div>
                <div className={`flex column between ${theme}1`}>
                    <main id="main-container" className={"flex minh100 gap-60 mtop-229"}>
                        <Sidebar selection='settings' />
                        <div id="settings-container" className={`flex column gap-40 ${theme} font-${fontSize}`}>
                            {isLoaded &&
                                <div id="settings-content" className={`flex column gap-15 ${theme}2`}>
                                    <div className="flex gap-25 mleft-25">
                                        <p className={`mleft-25`}>Theme:</p>
                                        <p className={`mleft-25`}>{theme}</p>
                                        <select className={`mleft-25 settings-select ${theme}1 ${theme} font-${font}`}
                                            defaultValue={theme}
                                            onChange={handleSelect}>
                                            <option value='light'>light</option>
                                            <option value='dark'>dark</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-25 mleft-25">
                                        <p className={`mleft-25 mleft-25`}>Font-size:</p>
                                        <select className={`mleft-25 settings-select ${theme}1 ${theme} font-${font}`}
                                            onChange={(e) => newFont(e)}
                                            value={fontSize}>
                                            <option value='16'>16</option>
                                            <option value='20'>20</option>
                                            <option value='24'>24</option>
                                            <option value='32'>32</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-25 mleft-25">
                                        <p className="mleft-25">Profile image:</p>
                                        {sessionUser.settings.image.includes('https://garden-city-academy.s3.amazonaws.com') ?
                                            <p className="mleft-25">
                                                {sessionUser.settings.image.slice(45, sessionUser.settings.image.length - 37)}
                                                {sessionUser.settings.image.slice(sessionUser.settings.image.length - 4)}</p> :
                                            <p className="mleft-25">{sessionUser.settings.image}</p>}
                                    </div>
                                    <FileUpload theme={theme} session={sessionUser} />
                                </div>}
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        }
    </>
    )
}
