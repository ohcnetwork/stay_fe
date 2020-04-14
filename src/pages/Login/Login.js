import React, { useState } from "react";
import loginImg from "../../assets/login.svg";
import './Login.css';
//import axios from 'axios';


function Login() {
    const [email, setUserEmail] = useState('');
    const [password, setUserPassword] = useState('');
    
    return (
        <div className="base-container" >
            <div className="header">Login</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} alt="login image"/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label >Email</label>
                        <input className="forminput" type="text" name="email" placeholder="email" value={email} onChange={e => setUserEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="forminput" type="password" name="password" placeholder="password" value={password} onChange={e => setUserPassword(e.target.value)} /> 
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