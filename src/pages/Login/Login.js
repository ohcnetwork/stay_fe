import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../redux/actions';

function Login(props) {

  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const { username, password } = inputs;
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

      setSubmitted(true);
      if (username && password) {
        console.log('logging in');
        const data = { username, password, token: 'mock-jwt' };
        setTimeout(() => {
          localStorage.setItem('user', JSON.stringify(data));
          dispatch(userActions.login(data));
        }, 2000);
      }
  }


  return (
    <div className="login">
      <h2>Login</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={handleChange} />
          {submitted && !username &&
            <div className="invalid-feedback">Username is required</div>
          }
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={handleChange} />
          {submitted && !password &&
            <div className="invalid-feedback">Password is required</div>
          }
        </div>
        <div>
          <button>
              {<span className="spinner-border spinner-border-sm mr-1"></span>}
              Login
          </button>
          <Link to="/register" className="btn btn-link">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;