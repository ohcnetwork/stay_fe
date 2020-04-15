import React from "react";
import { A } from "hookrouter";

function Home() {
  return (
    <div className="home-root">
      <div className="banner">
        <h1 className="secion-title">Quarantine Stay</h1>
        <div />
        <A href="/rooms" className="btn-primary">
          our rooms
        </A>
      </div>
    </div>
  );
}

export default Home;
