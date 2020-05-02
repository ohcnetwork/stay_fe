import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../Redux/actions";
import * as Notficiation from "../../util/Notifications";

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(false);

    const initForm = {
        email: "",
    };
    const [form, setForm] = useState(initForm);

    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...form };

        // error handling needed
        fieldValue[name] = name === "email" ? value.toLowerCase() : value;

        setForm(fieldValue);
    };

    function validateInputs() {
        let err = "";
        let formValid = true;
        if (form.email === "") {
            err = "Email is empty";
            formValid = false;
        }
        setFormError(err);
        return formValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // error handling required
        const valid = validateInputs();
        if (valid && !formLoading) {
            setFormLoading(true);

            dispatch(sendEmail(form))
                .then((resp) => {
                    const { data: res } = resp;
                    const { status: statusCode } = resp;

                    // set captha logic needed

                    // TODO: change status code to 200 (backend was sending 201 on forgot-pswd)
                    if (res && statusCode === 201) {
                        Notficiation.Success({
                            msg:
                                "Please check your mail to reset the password!",
                        });
                    } else {
                        setFormError(
                            "No such account exist. Check your emailid"
                        );
                        setFormLoading(false);
                    }
                })
                .catch((err) => {
                    Notficiation.Error({
                        msg: "Something went wrong, please try again",
                    });
                });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <h6 className="mt-5 text-center text-2  xl leading-9 font-bold text-gray-800 uppercase">
                        Enter your email
                    </h6>
                </div>
                <p className="text-center text-gray-800">
                    We will send you a mail to reset your pasword
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-200 shadow-lg rounded px-8 pt-6 pb-8 my-10">
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
                                formError ? "border-red-500" : ""
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            placeholder="Email address"
                        />
                    </div>
                    <div className="h-10">
                        <p className="text-red-500 text-xs italic bold">
                            {formError}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className={`flex items-center ${
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
                            Send mail
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
