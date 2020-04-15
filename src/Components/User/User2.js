import React from "react";
import './dashstyle.css';

export const User2 = ({ user }) => {
  const header = { backgroundImage: `url(${user.cover})` }
  return (
    <div className = "user-full">
      <div className = "user">
        <header style = {header} />
        <div className = "picture-container">
          <img alt={`${user.name}'s profile`} src={`${user.img}`} />
          <h2 className="name">{user.name}</h2>
        </div>
        <section className = "medals">
          <p> Address: <strong> { user.address } </strong> </p>
          <p> Phone Number: <strong> { user.phone_number } </strong> </p>
          <p> Email: <strong> { user.email } </strong> </p>

        </section>
      </div>
    
    </div>
  )
}

export default User2;
