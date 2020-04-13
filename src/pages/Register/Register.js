import React, { useState } from "react";
import loginImg from "./login.svg";

function Register() {
    const [name, settUsername] = useState("");
    const [email, settUserEmail] = useState("");
    const [password, settUserpassword] = useState("");
    const [cpassword, settUsercpassword] = useState("");
 
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input type="text" name="username" placeholder="username" onChange={e => settUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label >Email</label>
              <input type="text" name="email" placeholder="email" onChange={e => settUserEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label >Password</label>
              <input type="text" name="password" placeholder="password" onChange={e => settUserpassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label >Confirm Password</label>
              <input type="text" name="cpassword" placeholder="confirm password" onChange={e => settUsercpassword(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
export default Register;