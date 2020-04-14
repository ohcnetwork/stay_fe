import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const navEl = useRef(null);

  function menuToggle() {
    (menuActive)? menuDisable(): setMenuActive(true);
  }
  
  function menuDisable() {
    setMenuActive(false);
  }

  return (
    <header className="navbar">
      <h1>Stay</h1>
      <div role="button" className={`menu-btn ${menuActive? "is-active": ""}`} onClick={menuToggle}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <nav role="navigation" ref={navEl} className={`${menuActive? "is-active": ""}`} onClick={menuDisable}>
        <Link to ="/" className="nav-link">Home</Link>
        <Link to ="/about" className="nav-link">About</Link>
        <Link to ="/login" className="nav-link nav-btn">Login</Link>
        <Link to ="/register" className="nav-link nav-btn nav-btn-theme">Register</Link>
      </nav>
    </header>
  );
}

export default Navbar;