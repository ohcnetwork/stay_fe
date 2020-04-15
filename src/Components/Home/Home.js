
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-root">
      <div className="banner">
        <h1 className="secion-title">Quarantine Stay</h1>
        <div />
        <Link to="/rooms" className="btn-primary">
          our rooms
        </Link>
      </div>
    </div>
  );
}

export default Home;