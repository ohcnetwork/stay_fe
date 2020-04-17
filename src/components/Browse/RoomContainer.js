import React from "react";
import { withRoomConsumer } from "../Context/context";
// import Loading from "../Context/Loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

function RoomContainer({ context }) {
  const { sortedRooms, rooms } = context;
  console.log(context);
  // if (loading) {
  //   return <Loading />;
  // }
  return (
    // <>
    //   <RoomsFilter rooms={rooms} />
    //   <RoomsList rooms={sortedRooms} />
    // </>
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 max-w-6xl mx-auto">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3"></div>
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Accomodation
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
            Select an accomodation that fits your needs and your budget
          </p>
        </div>
        <RoomsFilter rooms={rooms} />
        <RoomsList rooms={sortedRooms} />
      </div>
    </div>
  );
}

export default withRoomConsumer(RoomContainer);
