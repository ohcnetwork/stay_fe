import React, { useState } from 'react';
import axios from 'axios';
import loginImg from '../../../Common/images/login.svg';
import './Register.css';

function Register() {
    const [formLoading, setFormLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        type: 'customer'
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        type: ''
    });
    
    
    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function validateInputs() {
        let formContainsError = false;
        let err = {name: '', email: '', password: '', confirm: '', type: ''};
        const { password, confirm } = inputs;

        Object.keys(inputs).forEach(key => {
            if (inputs[key] === '') {
                formContainsError = true;
                err[key] = "This field is required";
            }
        });
        
        if (password.length < 8) {
            err['password'] = 'Password must have atleat 8 characters';
            formContainsError = true;
        } else if (password.length > 49) {
            err['password'] = 'Password should not exceed 49 characters';
            formContainsError = true;
        } else if (password !== confirm) {
            err['confirm'] = 'Password and confirm password do not match';
            formContainsError = true;
        }

        setErrors(err);
        return formContainsError;
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        // const formContainsError = validateInputs();
        const formContainsError = false;
        
        if (!formContainsError) {
            console.log('creating a new user', inputs);
            setFormLoading(true);
            axios.post('http://localhost:4009/api/v1/auth/register', inputs)
                .then(res => {
                    console.log(res);
                })
                .catch(e => {
                    let backendErrors = e.response? e.response.data? e.response.data.message: null: null;
                    let err = {name: '', email: '', password: '', confirm: '', type: ''};

                    console.log(backendErrors);
                    backendErrors.forEach(individualError => {
                        err[individualError.property] = Object.values(individualError.constraints)[0];
                    });
                    console.log(err);
                    setErrors(err);
                })
                .finally(() => setFormLoading(false));
        }

    }
 
    return (
        <div className="register-container" >
            <h2 className="heading">Register</h2>
            <form name="form" onSubmit={handleSubmit} className="form regsiter">
                <img src={loginImg} className="image" alt="login page"/>
                <div className="form-group">
                    <label>Name</label>
                    <input className={`${errors.name? "error": ""}`} type="text" name="name" placeholder="Your Name" value={inputs.name} onChange={handleChange} />
                    {errors.name && <div className="error-text">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input className={`${errors.email? "error": ""}`} type="text" name="email" placeholder="Email address" value={inputs.email} onChange={handleChange} />
                    {errors.email && <div className="error-text">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className={`${errors.password? "error": ""}`} type="password" name="password" placeholder="Password" value={inputs.password} onChange={handleChange} />
                    {errors.password && <div className="error-text">{errors.password}</div>}
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input className={`${errors.confirm? "error": ""}`} type="password" name="confirm" placeholder="Confirm password" value={inputs.confirm} onChange={handleChange} />
                    {errors.confirm && <div className="error-text">{errors.confirm}</div>}
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select className={`${errors.type? "error": ""}`} name="type" value={inputs.type} onChange={handleChange}>
                        <option value="customer">Customer</option>
                        <option value="facilityowner">Facility Owner</option>
                    </select>
                    {errors.type && <div className="error-text">{errors.type}</div>}
                </div>
                <div className="form-group btn-container">
                    <button className={`btn ${formLoading? "loading": ""}`} type="submit">Register</button>
                </div>
            </form>
        </div>
    );
  }
export default Register;