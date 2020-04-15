import React from "react";
import { A } from "hookrouter";

function NavbarPublic() {
  return (
    <>
      <A href="/" className="nav-link">Home</A>
      <A href="/rooms" className="nav-link">Rooms</A>
      <A href="/login" className="nav-link nav-btn">Login</A>
      <A href="/register" className="nav-link nav-btn nav-btn-theme">Register</A>
    </>
  );
}

export default NavbarPublic;
