import React from "react";

import { useSelector } from "react-redux";

function User(props) {
  const user = useSelector((state) => state.user);

  return (
    <div className="user">
      <h2>Hey {user.email},</h2>
    </div>
  );
}

export default User;
