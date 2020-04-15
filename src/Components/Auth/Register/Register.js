import React, { useState } from "react";
import loginImg from "../../../Common/images/login.svg";
import './Register.css';

function Register() {
    const [name, setUsername] = useState('');
    const [email, setUserEmail] = useState('');
    const [password, setUserpassword] = useState('');
    const [cpassword, setUsercpassword] = useState('');
 
    return (
        <div className="base-container" >
            <div className="header">Register</div>
            <div className="content">
                <div className="image">
                   <img src={loginImg} alt="register page"/>
                </div>
                <form name="form">
                   <div className="form-group">
                        <label >Name</label>
                        <input type="text" name="username" placeholder="username"  value={name} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label >Email</label>
                        <input type="text" name="email" placeholder="email" value={email} onChange={e => setUserEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="text" name="password" placeholder="password" value={password} onChange={e => setUserpassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label >Confirm Password</label>
                        <input type="text" name="cpassword" placeholder="confirm password" value={cpassword} onChange={e => setUsercpassword(e.target.value)}/>
                    </div>
                </form>
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