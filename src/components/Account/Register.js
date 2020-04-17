import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postRegister } from "../../Redux/actions"
import { navigate, A } from "hookrouter";
import { USER_TYPES } from "../../Common/constants";
import * as Notficiation from "../../util/Notifications";

export default function Register() {
    const dispatch = useDispatch();
    const initForm = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        type: USER_TYPES[0].type
    }
    const initError = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        type: ""
    }

    const [formLoading, setFormLoading] = useState(false);
    const [form, setForm] = useState(initForm);
    const [error, setError] = useState(initError);
    const [formError, setFormError] = useState(false);

    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...form }

        // error handling needed

        fieldValue[name] = name === "email" ?
            value.toLowerCase() :
            value

        setForm(fieldValue)
    }

    function validInputs() {
        let formValid = true;
        let err = Object.assign({}, initError);
        const { password, confirm } = form;

        Object.keys(form).forEach(key => {
            if (form[key] === "") {
                formValid = false;
                err[key] = "This field is required";
            }
        });
        if (password !== confirm) {
            err["confirm"] = "Passwords do not match";
            formValid = false;
        }

        setError(err);
        return formValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validInputs() && !formLoading) {
            console.log("Register.js: ", "creating a new user", form);
            setFormLoading(true);
            dispatch(postRegister(form)).then(resp => {
                const { status: statusCode } = resp;
                const { data: res } = resp;
                
                // set captha logic needed
                if (res && statusCode === 201 && res.success === true) {
                    Notficiation.Success({
                        msg: "Account created, now login"
                    });
                    navigate("/login");
                }

                let formErr = "Some problem occurred";
                // error exists show error 
                if (res && res.success === false && res.data) {
                    formErr = Object.values(res.data)[0];
                }
                const errorMessages = resp.response ? resp.response.data ? resp.response.data.message : null : null;
                if (errorMessages) {
                    let err = initError;
                    errorMessages.forEach(msgObj => {
                        err[msgObj.property] = Object.values(msgObj.constraints).map((val, i) => <p key={i.toString()}>{val}</p>);
                    });
                    setError(err);
                }
                setFormError(formErr);
                setFormLoading(false);
            }).catch(err => {
                Notficiation.Error({
                    msg: 'Something went wrong, please try again'
                });
            });
        }
    }

    return (
        <div className="h-full flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <h2 className="mt-6 text-center text-3xl leading-9 font-bold text-gray-800 uppercase">
                        Create an account
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 my-20 bg-gray-200">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input aria-label="Name"
                            name="name"
                            type="name"
                            value={form.name}
                            onChange={handleChange}
                            className={`shadow appearance-none border ${error.name ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            placeholder="Your name" />
                        <div className="text-xs italic text-red-500">{error.name}</div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input aria-label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`shadow appearance-none border ${error.email ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            placeholder="Email address" />
                        <div className="text-xs italic text-red-500">{error.email}</div>
                    </div>
                    <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                aria-label="Password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                className={`shadow appearance-none border ${error.password ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                placeholder="******************" />
                            <div className="text-xs italic text-red-500">{error.password}</div>
                        </div>
                        <div className="md:ml-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm">
                                Confirm Password
                            </label>
                            <input
                                aria-label="Confirm Password"
                                name="confirm"
                                type="password"
                                value={form.confirm}
                                onChange={handleChange}
                                className={`shadow appearance-none border ${error.confirm ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                placeholder="******************" />
                            <div className="text-xs italic text-red-500">{error.confirm}</div>
                        </div>
                    </div>
                    <div className="-mt-px">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                            User Type
                        </label>
                        <div className="relative">
                            <select
                                value={form.type}
                                name="type"
                                onChange={handleChange}
                                className={`shadow appearance-none border ${error.type ? "border-red-500" : ""} bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            >
                                {
                                    USER_TYPES.map(type => <option key={type.type} value={type.type}>{type.string}</option>)
                                }
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                        <div className="text-xs italic text-red-500">{error.type}</div>
                    </div>
                    <div className="h-10">
                        <p className="text-red-500 text-xs italic bold text-center mt-2">{formError}</p>
                    </div>
                    <div className="flex items-center justify-between sm:flex-row">
                        <button type="submit" className={`flex items-center ${formLoading ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-800"} text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline`}>
                            <svg className={`h-5 w-5 ${formLoading ? "text-gray-400" : "text-indigo-500"} transition ease-in-out duration-150 mr-1`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Register
                         </button>
                        <A className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800" href="/login">
                            Already have an account?
                        </A>
                    </div>
                </form>
            </div>
        </div>
    );
}