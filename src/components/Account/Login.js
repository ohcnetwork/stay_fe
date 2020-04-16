import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postLogin } from "../../Redux/actions";
import { navigate } from "hookrouter";

export default function Login() {
    const dispatch = useDispatch();
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(false);
    const initForm = {
        email: "",
        password: "",
    };
    const [form, setForm] = useState(initForm);

    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...form }

        // error handling needed
        fieldValue[name] = name === "email" ?
            value.toLowerCase() :
            value;

        setForm(fieldValue);
    }

    function validateInputs() {
        let err = "";
        let formValid = true;
        if (form.email === "" || form.password === "") {
            err = "Email / Password is empty";
            formValid = false;
        }
        setFormError(err);
        return formValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // error handling required
        const valid = validateInputs();
        if (valid) {
            setFormLoading(true);
            console.log("Login.js: sending the data to backend", form);
            dispatch(postLogin(form)).then(resp => {
                console.log(resp);
                const { data: res } = resp;
                const { status: statusCode } = resp;
                // set captha logic needed
                
                // TODO: change status code to 200 (backend was sending 201 on login)
                if (res && statusCode === 201) {
                    localStorage.setItem("stay_access_token", res.access_token);
                    navigate("/");
                    window.location.reload();
                }
            }).catch(err => {
                setFormLoading(false);
            })

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
                    {formError && "Credentials dont match"}
                    <div className="rounded-md shadow-sm">
                        <div>
                            <input aria-label="Email"
                                name="email"
                                type="text"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email address" />
                        </div>
                        <div className="-mt-px">
                            <input
                                aria-label="Password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Password" />
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                            <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm leading-5">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}