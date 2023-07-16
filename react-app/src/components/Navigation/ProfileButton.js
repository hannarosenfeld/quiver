import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
      {user && (
      <div className="profile-pic-user-account-link"
                        style={{
                            backgroundImage: `url(${user.profile_pic})`, 
                            backgroundSize: "40px", 
                            backgroundPosition: "center"
                        }}>
      </div> )}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="dropdown-user-section" style={{fontWeight: "bold"}}>
              <div
                src={user.profile_pic} 
                className="dropdown-user-section-img" 
                style={{
                  backgroundImage: `url(${user.profile_pic})`, 
                  backgroundSize: "60px", 
                  backgroundPosition: "center"
            }}></div>
              <NavLink to={`/profile/${user.username}`} style={{display: "flex", justifyContent: "space-between", alignContent: "center"}}>
                <span>{user.username}</span>
                <i style={{fontSize: "0.8em", margin: "auto 0"}} class="fa-solid fa-chevron-right"></i>
              </NavLink>
            </li>
            <li className="dropdown-logout">
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
