import React from 'react';
import Hero from "./Hero";
import RoomsContainer from "./RoomContainer";

import { A } from "hookrouter";



function Rooms(props) {
  return (
    <>
      <Hero hero="roomsHero">
        <div className="banner">
          <A href="/" className="btn-primary">
            return home
         </A>
        </div>
      </Hero>
      <RoomsContainer />
    </>
  );
}

export default Rooms;