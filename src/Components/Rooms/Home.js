import React from "react";
import { A } from "hookrouter";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import FeaturedRooms from "../components/room/FeaturedRooms";
const home = () => {
  return (
    <>
      <Hero>
        <Banner
          title="Corona Stay"
        >
          <A href="/rooms" className="btn-primary">
            our rooms
          </A>
        </Banner>
      </Hero>
      {/* <FeaturedRooms /> */}
    </>
  );
};

export default home;
