import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "./OpenModalMenuItem";
import { thunkLogout } from "../../redux/session";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { FaUserCircle } from 'react-icons/fa';
import './Profile.css';
import { useNavigate } from "react-router-dom";

export default function ProfileButton({ icon }) {
  const sessionUser = useSelector((store) => store.session.user);
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
        {icon ? { icon } : <FaUserCircle />}
      </button>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {sessionUser ? (
            <div>
              <p>{sessionUser.username}</p>
              <p>{sessionUser.email}</p>
              <p>
                <button onClick={logout}>Log Out</button>
              </p>
            </div>
          ) : (
            <div className="flex column gap-15">
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
