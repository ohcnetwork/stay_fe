import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Services from "../components/Services";
import FeaturedRooms from "../components/room/FeaturedRooms";
const home = () => {
  return (
    <>
      <Hero>
        <Banner
          title="Corona Stay"
        >
          <Link to="/rooms" className="btn-primary">
            our rooms
          </Link>
        </Banner>
      </Hero>
        <FeaturedRooms />
    </>
  );
};

export default home;
