import React from "react";
import { User2 } from "./User2";  
import { useSelector  } from "react-redux";
import users from "../../Common/userdata/users";
import './dashstyle.css';
import img1 from "../../Common/userdata/userimages/pic.png";

function User(props) {
  const user = useSelector((state) => state.user);
  var usernew="",i=0;
  usernew={
    id: "NULL",
    name: "Name",
    address: "NULL",
    img: img1,
    cover: img1,
    phone_number: "NULL",
    email: user.email
  };
  for(i=0;i<users.length;i++){
    if(users[i].email===user.email)
      usernew=(users[i]);
  }
  
 return (
    <div className="user">
      <User2 user={usernew} />
    </div>
  );
}

export default User;