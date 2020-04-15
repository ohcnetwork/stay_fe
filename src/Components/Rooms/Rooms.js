import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import Hero from "./Hero";
import RoomsContainer from "./RoomContainer";

import { Link } from "react-router-dom";


function Rooms(props) {
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!user)
    //if(user) 
    {
      props.history.push('/login');
    }
  }, [user, props.history])
  
  return (
    <>
    <Hero hero="roomsHero">
    <div className="banner">
      <Link to="/" className="btn-primary">
        return home
      </Link>
    </div>
  </Hero>
  <RoomsContainer/>
  </>
  );
}

export default Rooms;