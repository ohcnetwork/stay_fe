import React from "react";
import Hero from "./Hero";
import { Link } from "react-router-dom";
import RoomsContainer from "./RoomContainer";
const Rooms = () => {
  return (
    <>
      <Hero hero="roomsHero">
        <div className="banner">
          <Link to="/" className="btn-primary">
            return home
          </Link>
        </div>
      </Hero>
      <RoomsContainer />
    </>
  );
};

export default Rooms;
