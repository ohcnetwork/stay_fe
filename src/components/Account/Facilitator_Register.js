import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postRegister } from "../../Redux/actions"
import { navigate, A } from "hookrouter";
import * as Notficiation from "../../util/Notifications";
import { validateEmailAddress, validatePassword } from "../../util/validation";

export default function FacilitatorRegister() {
    const dispatch = useDispatch();
    const initError1 = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        type: "facilityowner"
    }
    const initForm1 = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        type: "facilityowner"
    }


    const [error1, setError1] = useState(initError1);
    const [formError1, setFormError1] = useState(false);
    const [formLoading1, setFormLoading1] = useState(false);
    const [form1, setForm1] = useState(initForm1);
 



    function InputValidation() {
        let Validform = true;
        let err = Object.assign({}, initError1);
        const { password, confirm, email } = form1;

        Object.keys(form1).forEach(key => {
            if (form1[key] === "") {
                Validform = false;
                err[key] = "This field is required";
            }
        });
        if (password !== confirm) {
            err["confirm"] = "Passwords do not match";
            Validform = false;
        }
        if (!validateEmailAddress(email)) {
            err["email"] = "Enter a valid email";
            Validform = false;
        }
        if (password.length > 49) {
            err["password"] = "Maximum 49 characters";
            Validform = false;
        }
        else if (password.length < 8) {
            err["password"] = "Must be atleast 8 characters";
            Validform = false;
        }  
         else if (!validatePassword(password)) {
            err["password"] = <div className="flex md:block"><div>Should contain one uppercase,&nbsp;</div><div>lowercase digit and a symbol</div></div>;
            Validform = false;
        }


        setError1(err);
        return Validform;
    }
    const OnInputChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...form1 }

        // error handling needed

        fieldValue[name] = name === "email" ?
            value.toLowerCase() :
            value

        setForm1(fieldValue)
    }

    const SubmitForm = (e) => {
        e.preventDefault();

        if (InputValidation() && !formLoading1) {
            console.log("Register.js: ", "creating a new user", form1);
            setFormLoading1(true);
            dispatch(postRegister(form1)).then(resp => {
                const { status: statusCode } = resp;
                const { data: response } = resp;
                
                // set captha logic needed
                if (response && statusCode === 201 && response.success === true) {
                    Notficiation.Success({
                        msg: "Account created , now login"
                    });
                    navigate("/login");
                }

                let formErr = "Some problem occurred";
                // error exists show error 
                if (response && response.success === false && response.data) {
                    formErr = Object.values(response.data)[0];
                }
                const errorMessages = resp.response ? resp.response.data ? resp.response.data.message : null : null;
                if (errorMessages) {
                    let err = initError1;
                    errorMessages.forEach(msgObj => {
                        err[msgObj.property] = Object.values(msgObj.constraints).map((val, i) => <p key={i.toString()}>{val}</p>);
                    });
                    setError1(err);
                }
                setFormError1(formErr);
                setFormLoading1(false);
            }).catch(err => {
                Notficiation.Error({
                    msg: 'Something went wrong, please try again'
                });
            });
        }
    }

    return (
        <div className="  justify-center py-5 px-4 h-full flex items-center sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <h2 className="mt-6 text-center text-gray-800 uppercase text-3xl leading-9 font-bold ">
                        Register as Facility Owner
                    </h2>
                </div>
                <form onSubmit={SubmitForm} className="bg-white px-8 pt-6 pb-8 my-20 shadow-lg rounded  bg-gray-200">
                    <div className="mb-4">
                        <label className="text-gray-700 text-sm block  font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input aria-label="Name"
                            name="name"
                            type="name"
                            value={form1.name}
                            onChange={OnInputChange}
                            className={`shadow appearance-none border ${error1.name ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            placeholder="Your name" />
                        <div className="text-xs italic text-red-500">{error1.name}</div>
                    </div>
                    <div className="mb-4">
                        <label className="block  text-sm font-bold mb-2 text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input aria-label="Email"
                            name="email"
                            type="email"
                            value={form1.email}
                            onChange={OnInputChange}
                            className={`shadow appearance-none border ${error1.email ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            placeholder="Email address" />
                        <div className="text-xs italic text-red-500">{error1.email}</div>
                    </div>
                    <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                            <label className="block  font-bold text-gray-700 text-sm mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                aria-label="Password"
                                name="password"
                                type="password"
                                value={form1.password}
                                onChange={OnInputChange}
                                className={`shadow appearance-none border ${error1.password ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                placeholder="********" />
                            <div className="text-xs italic text-red-500">{error1.password}</div>
                        </div>
                        <div className="md:ml-2">
                            <label className="block  font-bold text-gray-700 text-sm mb-2" htmlFor="confirm">
                                Confirm Password
                            </label>
                            <input
                                aria-label="Confirm Password"
                                name="confirm"
                                type="password"
                                value={form1.confirm}
                                onChange={OnInputChange}
                                className={`shadow appearance-none border ${error1.confirm ? "border-red-500" : ""} py-2 px-3 text-gray-700 rounded w-full  leading-tight focus:outline-none focus:shadow-outline`}
                                placeholder="********" />
                            <div className=" text-red-500 text-xs italic">{error1.confirm}</div>
                        </div>
                    </div>
                    <div className="h-10">
                        <p className="text-red-500  text-center mt-2 text-xs italic bold">{formError1}</p>
                    </div>
                    <div className=" justify-between flex items-center sm:flex-row">
                        <button type="submit" className={`flex items-center ${formLoading1 ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-800"} text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline`}>
                            <svg className={`h-5 w-5 ${formLoading1 ? "text-gray-400" : "text-indigo-500"} transition ease-in-out duration-150 mr-1`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Register
                         </button>
                        <A className="text-indigo-600 hover:text-indigo-800 inline-block ml-2 align-baseline text-center font-bold text-sm " href="/login">
                            Already have an account?
                        </A>
                        <A className="text-indigo-600 inline-block align-baseline text-center font-bold text-sm  hover:text-indigo-800" href="/register/user">
                            Register as Customer
                        </A>
                    </div>
                </form>
            </div>
        </div>
    );
}