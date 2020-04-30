import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Notficiation from "../../../util/Notifications";

export default function EditDetails() {
    const dispatch = useDispatch();
    const state = useSelector((reduxState) => reduxState);
    const { currentUser } = state;
    const initForm2 = {
        id: currentUser.data.data.id,
        name: currentUser.data.data.name,
        mobno: "",
        email: currentUser.data.data.email,
    };

    const initError2 = {
        id: currentUser.data.data.id,
        name: "",
        mobno: "",
        email: "",
    };

    const [formLoading2, setFormLoading2] = useState(false);
    const [form2, setForm2] = useState(initForm2);
    const [error2, setError2] = useState(initError2);
    const [formError2, setFormError2] = useState(false);

    const handleChange2 = (e) => {
        const { value, name } = e.target;
        const fieldValue2 = { ...form2 };

        // error handling needed

        fieldValue2[name] = name === "email" ? value.toLowerCase() : value;

        setForm2(fieldValue2);
    };
    console.log(currentUser);
    const handleSubmit2 = (e) => {
        e.preventDefault();
        console.log("submit");
    };

    return (
        <div className="max-w-md  sm:m-auto sm:m-0 sm:h-1/4 lg:mr-3 w-full">
            <div>
                <h2 className="mt-5  text-center text-3xl leading-9 font-bold text-gray-800 uppercase">
                    Change Details
                </h2>
            </div>
            <form
                onSubmit={handleSubmit2}
                className={`bg-white shadow-lg mt-4 rounded px-8 pt-6 pb-8 my-20 ${
                    currentUser.data.data.type === "user"
                        ? "bg-gray-400"
                        : "bg-white"
                }`}>
                <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password">
                        Full Name
                    </label>
                    <input
                        aria-label="Name"
                        name="name"
                        type="text"
                        value={form2.name}
                        onChange={handleChange2}
                        className={`shadow appearance-none border ${
                            error2.password ? "border-red-500" : ""
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    />
                    <div className="text-xs italic text-red-500">
                        {error2.password}
                    </div>
                </div>
                <div className="mb-4 sm:h-1/4 md:flex md:justify-between">
                    <div className="mb-4 pt-3 md:mr-2 md:mb-0">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password">
                            Email id
                        </label>
                        <input
                            aria-label="Password"
                            name="email"
                            type="email"
                            value={form2.email}
                            onChange={handleChange2}
                            className={`shadow appearance-none border ${
                                error2.password ? "border-red-500" : ""
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                        <div className="text-xs italic text-red-500">
                            {error2.password}
                        </div>
                    </div>
                    <div className="md:ml-2 pt-3">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="confirm">
                            Mobile Number
                        </label>
                        <input
                            aria-label="Confirm Password"
                            name="mobno"
                            type="text"
                            value={form2.mobno}
                            onChange={handleChange2}
                            className={`shadow appearance-none border ${
                                error2.confirm ? "border-red-500" : ""
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                        <div className="text-xs italic text-red-500">
                            {error2.confirm}
                        </div>
                    </div>
                </div>
                <div className="h-10">
                    <p className="text-red-500 text-xs italic bold text-center mt-2">
                        {formError2}
                    </p>
                </div>
                <div className="flex items-center justify-between sm:flex-row">
                    <button
                        type="submit"
                        className={`flex items-center ${
                            formLoading2
                                ? "bg-gray-600"
                                : "bg-indigo-600 hover:bg-indigo-800"
                        } text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline`}>
                        <svg
                            className={`h-5 w-5 ${
                                formLoading2
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
                        Change Details
                    </button>
                </div>
            </form>
        </div>
    );
}
