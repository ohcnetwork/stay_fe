import React, { useState } from "react";

import NavbarPublic from "./NavbarPublic";
import NavbarPrivate from "./NavbarPrivate";

import "./Navbar.css";

function Navbar({ type }) {
  const [menuActive, setMenuActive] = useState(false);

  function menuToggle() {
    menuActive ? menuDisable() : setMenuActive(true);
  }

  function menuDisable() {
    setMenuActive(false);
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
        {
          type === "private" 
          ?
            <NavbarPrivate />
          :
            <NavbarPublic />
        }
      </nav>
    </header>
  );
}

export default Navbar;
