
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import loginImg from "../../../Common/images/login.svg";
import './Login.css';

import { userActions } from '../../../Redux/actions';

function Login(props) {

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const { email, password } = inputs;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  // check login status
  useEffect(() => { 
    if (user) {
      console.log('login.js: a user had already logged in', user);
      props.history.push('/user');
    }
  }, [user, props.history]);

  function handleSubmit(e) {
      e.preventDefault();

      if (email && password) {
        console.log('logging in');
        const data = { email, password, token: 'mock-jwt' };
        setTimeout(() => {
          localStorage.setItem('user', JSON.stringify(data));
          dispatch(userActions.login(data));
        }, 2000); /* mock loding time */
      }
  }


  return (
    <div className="base-container" >
      <div className="header">Login</div>
      <form name="form" onSubmit={handleSubmit} className="form">
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login image"/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" name="email" placeholder="email" value={email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="password" value={password} onChange={handleChange} />
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;