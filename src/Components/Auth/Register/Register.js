import React, { useState } from "react";
import axios from "axios";
// import { navigate } from "hookrouter";

import { USER_TYPES } from "../../../Common/constants";
import { TextInputField } from "../../Common/InputFields/InputFields";

import loginImg from "../../../Common/images/login.svg";
import "./Register.css";

function Register(props) {
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        type: "customer"
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        type: ""
    });
    
    
    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function validateInputs() {
        let formContainsError = false;
        let err = {name: "", email: "", password: "", confirm: "", type: ""};
        const { password, confirm } = inputs;

        Object.keys(inputs).forEach(key => {
            if (inputs[key] === "") {
                formContainsError = true;
                err[key] = "This field is required";
            }
        });
        
        if (password.length < 8) {
            err["password"] = "Password must have atleat 8 characters";
            formContainsError = true;
        } else if (password.length > 49) {
            err["password"] = "Password should not exceed 49 characters";
            formContainsError = true;
        } else if (password !== confirm) {
            err["confirm"] = "Password and confirm password do not match";
            formContainsError = true;
        }

        setErrors(err);
        return formContainsError;
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateInputs() && !formLoading) {
            console.log("creating a new user", inputs);
            setFormLoading(true);
            axios.post("http://localhost:4009/api/v1/auth/register", inputs)
                .then(res => {
                    console.log(res);
                    // navigate("/login");
                })
                .catch(e => {
                    let backendErrors = e.response? e.response.data? e.response.data.message: null: null;
                    let err = {name: "", email: "", password: "", confirm: "", type: ""};
                    let formErr = "";

                    if (backendErrors === null) {
                        formErr = "Something went wrong, please try again";
                    } else {
                        backendErrors.forEach(individualError => {
                            err[individualError.property] = Object.values(individualError.constraints)[0];
                        });
                    }
                    console.log(err);
                    setFormError(formErr);
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
                <TextInputField label="Name" type="text" name="name" placeholder="Your name" value={inputs.value} onChange={handleChange} error={errors.name} />
                <TextInputField label="Email" type="email" name="email" placeholder="Email address" value={inputs.email} onChange={handleChange} error={errors.email} />
                <TextInputField label="Password" type="password" name="password" placeholder="Password" value={inputs.password} onChange={handleChange} error={errors.password} />
                <TextInputField label="Confirm Password" type="password" name="confirm" placeholder="Confirm password" value={inputs.confirm} onChange={handleChange} error={errors.confirm} />
                <div className="form-group">
                    <label>Type</label>
                    <select className={`${errors.type? "error": ""}`} name="type" value={inputs.type} onChange={handleChange}>
                        {USER_TYPES.map(uType => <option key={uType.type} value={uType.type}>{uType.string}</option>)}
                    </select>
                    {errors.type && <div className="error-text">{errors.type}</div>}
                </div>
                {formError && <div className="error-text">{formError}</div>}
                <div className="form-group btn-container">
                    <button className={`btn ${formLoading? "loading": ""}`} type="submit">Register</button>
                </div>
            </form>
        </div>
    );
  }
export default Register;