import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { userActions } from "../../../redux/actions";

import "./Navbar.css";

function Navbar() {
  const user = useSelector((state) => state.user);

  const [menuActive, setMenuActive] = useState(false);

  const dispatch = useDispatch();

  function menuToggle() {
    menuActive ? menuDisable() : setMenuActive(true);
  }

  function menuDisable() {
    setMenuActive(false);
  }

  function logoutUser() {
    localStorage.removeItem("user");
    dispatch(userActions.logout());
  }

  return (
    <header className="navbar">
      <h1>Stay</h1>
      <div
        role="button"
        className={`menu-btn ${menuActive ? "is-active" : ""}`}
        onClick={menuToggle}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <nav
        role="navigation"
        className={`${menuActive ? "is-active" : ""}`}
        onClick={menuDisable}
      >
        {user ? (
          <>
            <Link to="/user" className="nav-link">
              Dashboard
            </Link>
            <Link to="/rooms" className="nav-link">
              Rooms
            </Link>
            <div
              role="button"
              onClick={logoutUser}
              className="nav-link nav-btn nav-btn-theme"
            >
              Logout
            </div>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/login" className="nav-link nav-btn">
              Login
            </Link>
            <Link to="/register" className="nav-link nav-btn nav-btn-theme">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
