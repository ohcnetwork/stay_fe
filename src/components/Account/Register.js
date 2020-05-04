import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postRegister } from "../../Redux/actions";
import { navigate, A } from "hookrouter";
import * as Notficiation from "../../util/Notifications";
import { validateEmailAddress, validatePassword } from "../../util/validation";

export default function Register(user) {
    const textInput = useRef(null);
    const dispatch = useDispatch();
    const initForm = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        type: user.type,
    };
    const initError = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        type: user.type,
    };

    const [formLoading, setFormLoading] = useState(false);
    const [form, setForm] = useState(initForm);
    const [error, setError] = useState(initError);
    const [formError, setFormError] = useState(false);
    useEffect(() => {
        textInput.current && textInput.current.focus();
    }, []);
    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...form };

        // error handling needed

        fieldValue[name] = name === "email" ? value.toLowerCase() : value;

        setForm(fieldValue);
    };
    const links = ["user-register", "facilitator-register"];

    function validInputs() {
        let formValid = true;
        let err = Object.assign({}, initError);
        const { password, confirm, email } = form;

        Object.keys(form).forEach((key) => {
            if (form[key] === "") {
                formValid = false;
                err[key] = "This field is required";
            }
        });
        if (password !== confirm) {
            err["confirm"] = "Passwords do not match";
            formValid = false;
        }
        if (!validateEmailAddress(email)) {
            err["email"] = "Enter a valid email";
            formValid = false;
        }
        if (password.length < 8) {
            err["password"] = "Must be atleast 8 characters";
            formValid = false;
        } else if (password.length > 49) {
            err["password"] = "Maximum 49 characters";
            formValid = false;
        } else if (!validatePassword(password)) {
            err["password"] = (
                <div className="flex md:block">
                    <div>Should contain one uppercase,&nbsp;</div>
                    <div>lowercase digit and a symbol</div>
                </div>
            );
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
            dispatch(postRegister(form))
                .then((resp) => {
                    const { status: statusCode } = resp;
                    const { data: res } = resp;

                    // set captha logic needed
                    if (res && statusCode === 201 && res.success === true) {
                        Notficiation.Success({
                            msg: "Account created, now login",
                        });
                        navigate("/login");
                    }

                    let formErr = "Some problem occurred";
                    // error exists show error
                    if (res && res.success === false && res.data) {
                        formErr = Object.values(res.data)[0];
                    }
                    const errorMessages = resp.response
                        ? resp.response.data
                            ? resp.response.data.message
                            : null
                        : null;
                    if (errorMessages) {
                        let err = initError;
                        errorMessages.forEach((msgObj) => {
                            err[msgObj.property] = Object.values(
                                msgObj.constraints
                            ).map((val, i) => <p key={i.toString()}>{val}</p>);
                        });
                        setError(err);
                    }
                    setFormError(formErr);
                    setFormLoading(false);
                })
                .catch((err) => {
                    Notficiation.Error({
                        msg: "Something went wrong, please try again",
                    });
                });
        }
    };

    return (
        <div className="lg:min-h-full flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <h2 className="lg:mt-4 mt-3 text-center text-xl lg:text-3xl leading-9 font-bold text-gray-800 uppercase">
                        {user.label}
                    </h2>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="shadow-lg rounded px-8 pt-6 pb-8 mt-10 my-20 bg-gray-200">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name">
                            Name
                        </label>
                        <input
                            ref={textInput}
                            aria-label="Name"
                            name="name"
                            type="name"
                            value={form.name}
                            onChange={handleChange}
                            className={`shadow appearance-none border ${
                                error.name ? "border-red-500" : ""
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            placeholder="Your name"
                        />
                        <div className="text-xs italic text-red-500">
                            {error.name}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email">
                            Email
                        </label>
                        <input
                            aria-label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`shadow appearance-none border ${
                                error.email ? "border-red-500" : ""
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            placeholder="Email address"
                        />
                        <div className="text-xs italic text-red-500">
                            {error.email}
                        </div>
                    </div>
                    <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password">
                                Password
                            </label>
                            <input
                                aria-label="Password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                className={`shadow appearance-none border ${
                                    error.password ? "border-red-500" : ""
                                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                placeholder="******************"
                            />
                            <div className="text-xs italic text-red-500">
                                {error.password}
                            </div>
                        </div>
                        <div className="md:ml-2">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="confirm">
                                Confirm Password
                            </label>
                            <input
                                aria-label="Confirm Password"
                                name="confirm"
                                type="password"
                                value={form.confirm}
                                onChange={handleChange}
                                className={`shadow appearance-none border ${
                                    error.confirm ? "border-red-500" : ""
                                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                placeholder="******************"
                            />
                            <div className="text-xs italic text-red-500">
                                {error.confirm}
                            </div>
                        </div>
                    </div>
                    <div className="h-10">
                        <p className="text-red-500 text-xs italic bold text-center mt-2">
                            {formError}
                        </p>
                    </div>
                    <div className="flex items-center justify-between sm:flex-row ">
                        <button
                            type="submit"
                            className={`flex  mr-2 items-center ${
                                formLoading
                                    ? "bg-gray-600"
                                    : "bg-indigo-600 hover:bg-indigo-800"
                            } text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline`}>
                            <svg
                                className={`h-5 w-5 ${
                                    formLoading
                                        ? "text-gray-400"
                                        : "text-indigo-500"
                                } transition ease-in-out duration-150 mr-1`}
                                fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Register
                        </button>
                        <div className="flex-row  ml-2 ">
                            {/* <A
                                className="inline-block align-baseline text-center  font-bold text-sm text-indigo-600 hover:text-indigo-800"
                                href={"/" + links[user.otherlinkid]}>
                                Register as {user.othertype}
                            </A> */}
                            <A
                                className="inline-block align-baseline font-bold text-center text-sm text-indigo-600 hover:text-indigo-800"
                                href="/login">
                                Already have an account?
                            </A>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
