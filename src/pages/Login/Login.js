import React, { useState } from "react";
import loginImg from "./login.svg";
//import axios from 'axios';


    function Login() {
        const [email, settUserEmail] = useState("");
        const [password, settUserPassword] = useState("");
    return (
      <div className="base-container" >
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={e => settUserEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={e => settUserPassword(e.target.value)} /> 
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button"  className="btn">
            Login
          </button>
        </div>
      </div>
    );
  }
 export default Login;