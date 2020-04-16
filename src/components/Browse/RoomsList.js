import React from "react";
import Room from "./RoomInfo";
const RoomsList = ({ rooms }) => {
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>unfortunately no rooms matched your search parameters</h3>
      </div>
    );
  }
  return (
    <div className="roomslist-center">
      <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">

        {rooms.map(item => {
          return <Room key={item.id} room={item} />
        })}
      </div>
    </div>
  );
};

export default RoomsList;
