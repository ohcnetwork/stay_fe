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
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );
}

export default withRoomConsumer(RoomContainer);
