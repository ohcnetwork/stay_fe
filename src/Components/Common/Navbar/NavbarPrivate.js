import React from "react";
import { useDispatch } from "react-redux";
import { A, navigate } from "hookrouter";

import { userActions } from "../../../redux/actions";

function NavbarPrivate() {
  const dispatch = useDispatch();

  function logoutUser() {
    localStorage.removeItem("user");
    dispatch(userActions.logout());
    navigate('/');
  }

  return (
    <>
      <A href="/user" className="nav-link">Dashboard</A>
      <A href="/rooms" className="nav-link">Rooms</A>
      <div
        role="button"
        onClick={logoutUser}
        className="nav-link nav-btn nav-btn-theme"
      >
        Logout
      </div>
    </>
  );
}

export default NavbarPrivate;