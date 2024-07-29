import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { thunkLogout } from "../../redux/session";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useNavigate } from "react-router-dom";
import './Profile.css';

export default function ProfileButton() {
  const sessionUser = useSelector((store) => store.session.user);
  const url = useSelector((store) => store.session.user)?.settings.image;
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout()).then(() =>
      navigate('/'))
    closeMenu();
  };

  return (
    <>
      <button id="profile-button" onClick={toggleMenu}>
        {url ? <img src={url} className={`${sessionUser.settings.theme}3`} /> : <img src='/cross.jpg' className='default' />}
      </button>
      {showMenu && (
        <div className={`profile-dropdown ${sessionUser ? sessionUser.settings.theme : 'light '}2`} ref={ulRef}>
          {sessionUser ? (
            <div className="flex column gap-25 margin-15">
              <p className={`${sessionUser.settings.theme}`}>{sessionUser.username}</p>
              <p className={`${sessionUser.settings.theme}`}>{sessionUser.email}</p>
              <p className={`${sessionUser.settings.theme}`}>
                <button className="button" onClick={logout}>Log Out</button>
              </p>
            </div>
          ) : (
            <div className={`flex column gap-25 margin-15`}>
              <OpenModalMenuItem
                main={true}
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal navigate={() => navigate('/dashboard')} />}
              />
              <OpenModalMenuItem
                main={true}
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal navigate={() => navigate('/dashboard')} />}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
