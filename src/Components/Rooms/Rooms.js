import React, { useEffect } from "react";

import { useSelector } from "react-redux";

function Rooms(props) {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      props.history.push("/login");
    }
  }, [user, props.history]);

  return (
    <div className="rooms">
      <h2>Rooms</h2>
    </div>
  );
}

export default Rooms;
