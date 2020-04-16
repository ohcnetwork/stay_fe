import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postRegister } from "../../Redux/actions"
import { navigate } from "hookrouter";
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
            err["confirm"] = "Password and confirm password do not match";
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
                const { data: res } = resp;
                console.log(res);
                const { status: statusCode } = resp;
                // set captha logic needed
                if (res && statusCode === 201 && res.success === true) {
                    Notficiation.Success({
                        msg: "Account created, now login"
                    });
                    navigate("/login");
                } else {
                    setFormError(Object.values(res.data)[0]);
                    setFormLoading(false);
                }
            }).catch(err => {
                console.log("Register.js: register error", err);
                setFormLoading(false);
            })

        } else {
            console.log("Register.js: form errors preseing ot presently loading", error);
        }
    }

    return (
        <div className="h-full flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Sign in to continue
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="mt-8">
                    <input type="hidden" name="remember" value="true" />
                    {formError}
                    <div className="rounded-md shadow-sm">
                        <div>
                            <input aria-label="Name"
                                name="name"
                                type="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                placeholder="Your name" />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                placeholder="Email address" />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                placeholder="Password" />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Confirm password"
                                name="confirm"
                                type="password"
                                value={form.confirm}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                placeholder="Confirm Password" />
                        </div>
                        <div className="-mt-px">
                            <select
                                value={form.type}
                                name="type"
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full py-3 px-2 border border-gray-300 bg-gray-100 text-gray-900 leading-tight focus:outline-none focus:border-blue-300 focus:outline-none focus:shadow-outline-blue sm:text-sm sm:leading-5"
                                >
                                {
                                    USER_TYPES.map(type => <option key={type.type} value={type.type}>{type.string}</option>)
                                }
                            </select>
                        </div>
                       
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}