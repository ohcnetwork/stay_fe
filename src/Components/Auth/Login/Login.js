import React, { useState } from "react";
import { useDispatch } from "react-redux";
import loginImg from "../../../Common/images/login.svg";
import "./Login.css";
import { userActions } from "../../../redux/actions";
import { navigate } from "hookrouter";

function Login() {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }
  
  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      console.log("logging in");
      const data = { email, password, token: "mock-jwt" };
      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(userActions.login(data));
        navigate("/user");
      }, 2000); /* mock loding time */
    }
  }

  return (
    <div className="base-container">
      <div className="header">Login</div>
      <form name="form" onSubmit={handleSubmit} className="form">
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login page" />
          </div>
    
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={handleChange}
            />
          </div>
    
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={handleChange}
            />
          </div>
    
        </div>
        <div className="footer">
          <button className="btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
