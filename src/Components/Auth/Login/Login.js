import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { navigate } from "hookrouter";
import axios from "axios";

import { TextInputField } from "../../Common/FormElements/InputFields";
import { ThemeButton } from "../../Common/FormElements/Buttons";

import { BASE_URL } from "../../../Common/constants";
import api from "../../../Common/api";
import loginImg from "../../../Common/images/login.svg";
import "./Login.css";
import { userActions } from "../../../redux/actions";

function Login() {

    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    function validateInputs() {
        let err = "";
        let formValid = true;
        if (inputs.email === "" || inputs.password === "") {
            err = "Email / Password is empty";
            formValid = false;
        }
        setFormError(err);
        return formValid;
    }

    function handleSubmit(e) {
        e.preventDefault();

        

        if (validateInputs()) {
            console.log("Login.js: logging in");
            setFormLoading(true);
            let apiObj = api.login;
            
            axios[apiObj.method.toLowerCase()](`${BASE_URL}${apiObj.path}`, inputs)
                .then(res => {
                    console.log("Login.js: ", res);
                    if (res.data && res.data.access_token) {
                        let apiObj = api.getCurrentUser;
                        let config = { headers: { Authorization: `Bearer ${res.data.access_token}` } };
                        axios[apiObj.method.toLowerCase()](`${BASE_URL}${apiObj.path}`, config)
                            .then(resData => {
                                localStorage.setItem("stay_access_token", res.data.access_token);
                                if (resData.data && resData.data.data) {
                                    let { id, name, email, type } = resData.data.data;
                                    dispatch(userActions.login({ id, name, email, type }));
                                    navigate("/user");
                                } else {
                                    setFormError("Something went wrong, please try again");
                                    setFormLoading(false);
                                }
                            })
                            .catch(err => {
                                console.log("Login.js: ", err);
                                setFormError("Something went wrong, please try again");
                                setFormLoading(false);
                            })
    
                    } else {
                        setFormError("Something went wrong, please try again");
                        setFormLoading(false);
                    }
                })
                .catch(err => {
                    let errorText = "";
                    if (err.response && err.response.status === 401) {
                        errorText = "Incorrect email / password";
                    } else {
                        errorText = "Something went wrong, please try again";
                    }
                    console.log("Login.js: ", err);
                    setFormError(errorText);
                    setFormLoading(false)
                })
        }
    }

    return (
        <div className="login-container">
            <h2 className="heading">Login</h2>
            <form name="form" onSubmit={handleSubmit} className="form">
                <img src={loginImg} alt="login page" className="image" />
                
                <TextInputField type="text" label="Email" placeholder="Email address" value={inputs.email} name="email" onChange={handleChange} />
                <TextInputField type="password" label="Password" placeholder="Password" value={inputs.password} name="password" onChange={handleChange} />
                {formError && <div className="error-text">{formError}</div>}

                <div className="form-group btn-container">
                    <ThemeButton text="Login" type="submit" loading={formLoading} />
                </div>
            </form>
        </div>
    );
}
export default Login;
