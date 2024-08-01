import { removeAccounts, thunkGetAccount, thunkUpdateAccount } from "../../redux/account";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../LandingPage/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer";
import './Account.css'


export default function Account() {
    const font = useSelector((store) => store.session.user)?.settings.font_size;
    const theme = useSelector((store) => store.session.user)?.settings.theme;
    const role = useSelector((store) => store.session.user)?.settings.role;
    const sessionUser = useSelector((store) => store.session.user);
    const data = useSelector((store) => store.account.data);
    const [newPassword, setNewPassword] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
            dispatch(removeAccounts())
        }
    }, [navigate, dispatch, sessionUser])

    useEffect(() => {
        dispatch(thunkGetAccount())
    }, [isLoaded, dispatch])

    useEffect(() => {
        if (data) {
            if (data.student) {
                setAge(data.student.age)
                setName(data.student.name.split(' ')[0])
                setEmail(data.student.email)
                setUser(data.student.username)
                setIsLoaded(true)
            } else if (data.parent) {
                setAge(data.parent.age)
                setName(data.parent.name.split(' ')[0])
                setEmail(data.parent.email)
                setUser(data.parent.username)
                setIsLoaded(true)
            }
        }
    }, [data])

    const handleSave = async () => {
        setErrors({})
        const info = {};
        let numErrors = 0
        const errors = {}
        if (newPassword !== confirm) {
            errors.confirm = 'new password and confirm password must match.'
            numErrors++;
        }
        if ((newPassword === confirm) && confirm.length > 0 && confirm.length < 8) {
            errors.newpassword = 'password must have at least 8 characters.'
            numErrors++;
        }
        if (numErrors > 0) {
            setErrors(errors)
        } else {
            if (confirm.length > 7) {
                info.newPassword = confirm;
                info.password = password;
            }
            if (data.student) {
                if (name !== data.student.name.split(' ')[0]) info.firstName = name;
                if (age !== data.student.age) info.age = age;
                if (email !== data.student.email) info.email = email;
                if (user !== data.student.username) info.username = user;
            } else if (data.parent) {
                if (name !== data.parent.name.split(' ')[0]) info.firstName = name;
                if (age !== data.parent.age) info.age = age;
                if (email !== data.parent.email) info.email = email;
                if (user !== data.parent.username) info.username = user;
            }
            const response = await dispatch(thunkUpdateAccount(JSON.stringify(info)));
            if (response.errors) {
                setErrors(response.errors)
            }
        }
    }

    const change = (func) => {
        setErrors({})
        func();
    }

    return (<>
        {isLoaded && <div>
            <div className={`flex column between ${theme}1`}>
                <Header main={true} />
                <main id="main-container" className="flex minh100 gap-60">
                    <Sidebar selection='account' />
                    <div id="account-container" className={`flex column gap-25 aend padding-40 ${theme} font-${font} ${theme}2`}>
                        {role === 'student' && <p className="aselfstart">Welcome {data?.student.name},</p>}
                        {role === 'parent' && <p className="aselfstart">Welcome {data?.parent.name},</p>}
                        <p className="aselfstart">Change account details below.</p>
                        <div className="flex gap-15 acenter">
                            <p>Name:</p>
                            <input type="text"
                                className={`${theme}3 ${theme} rad-10`}
                                value={name}
                                onChange={(e) => change(() => setName(e.target.value))}
                                required
                            />
                        </div>
                        <div className="flex gap-15 acenter">
                            <p>Age:</p>
                            <input type="number"
                                className={`${theme}3 ${theme} rad-10`}
                                value={age}
                                onChange={(e) => change(() => setAge(e.target.value))}
                                required
                            />
                        </div>
                        <div className="flex gap-15 acenter">
                            <p>User name:</p>
                            <input type="text"
                                className={`${theme}3 ${theme} rad-10`}
                                value={user}
                                onChange={(e) => change(() => setUser(e.target.value))}
                                required
                            />
                        </div>
                        <div className="flex gap-15 acenter">
                            <p>Email:</p>
                            <input type="text"
                                className={`${theme}3 ${theme} rad-10`}
                                value={email}
                                onChange={(e) => change(() => setEmail(e.target.value))}
                                required
                            />
                        </div>
                        {role === 'student' && <div className="flex gap-15">
                            <p>Parents:</p>
                            {data.parents.length === 1 ?
                                <p>{data.parents[0].name}</p> :
                                <div className="flex column gap-10">
                                    <p>{data.parents[0].name}</p>
                                    <p>{data.parents[1].name}</p>
                                </div>}
                        </div>}
                        {role === 'parent' && <div className="flex gap-15">
                            <p>{data.children.length === 1 ? 'Child:' : 'Children:'}</p>
                            {data.children.length === 1 ?
                                <p>{data.children[0].name}</p> :
                                <div className="flex column gap-10">
                                    {data.children.map((child) => (<p key={`child:${child.id}`}>{child.name}</p>))}
                                </div>
                            }
                        </div>}
                        <p className="aselfstart">Update your password?</p>
                        <div className="flex gap-15 acenter">
                            <p>Current password:</p>
                            <input type="password"
                                className={`${theme}3 ${theme} rad-10`}
                                placeholder="password"
                                value={password}
                                onChange={(e) => change(() => setPassword(e.target.value))}
                            />
                        </div>
                        {errors.password && <p className={`error font-20`}>{errors.password}</p>}
                        <div className="flex gap-15 acenter">
                            <p>New password:</p>
                            <input type="password"
                                className={`${theme}3 ${theme} rad-10`}
                                placeholder="new password"
                                value={newPassword}
                                onChange={(e) => change(() => setNewPassword(e.target.value))}
                            />
                        </div>
                        {errors.newpassword && <p className={`error font-20`}>{errors.newpassword}</p>}
                        <div className="flex gap-15 acenter">
                            <p>Confirm password:</p>
                            <input type="password"
                                className={`${theme}3 ${theme} rad-10`}
                                placeholder="confirm password"
                                value={confirm}
                                onChange={(e) => change(() => setConfirm(e.target.value))}
                            />
                        </div>
                        {errors.confirm && <p className={`error font-20`}>{errors.confirm}</p>}
                        <button className="button" onClick={handleSave}>Save changes</button>
                    </div>
                </main>
            </div>
            <Footer />
        </div>}
    </>
    )
}
