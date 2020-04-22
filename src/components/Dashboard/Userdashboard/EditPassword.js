import React, { useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { changePassword  } from "../../../Redux/actions"
import * as Notficiation from "../../../util/Notifications";
import {  validatePassword } from "../../../util/validation";


export default function EditPassword(){
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { currentUser } = state;
    const initForm = {
        id:currentUser.data.data.id,
        currentPassword:"",
        password: "",
        confirm: ""
    };
    const initError = {
        id:currentUser.data.data.id,
        currentPassword:"",
        password: "",
        confirm: "",
    };
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
    };
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
        if (password.length < 8) {
            err["password"] = "Must be atleast 8 characters";
            formValid = false;
        } else if (password.length > 49) {
            err["password"] = "Maximum 49 characters";
            formValid = false;
        } else if (!validatePassword(password)) {
            err["password"] = <div className="flex md:block"><div>Should contain one uppercase,&nbsp;</div><div>lowercase digit and a symbol</div></div>;
            formValid = false;
        }


        setError(err);
        return formValid;
    }
        const handleSubmit = (e) => {
        e.preventDefault();

        if (validInputs() && !formLoading) {
            console.log(form);
            setFormLoading(true);
            dispatch(changePassword(form)).then(resp => {
                const { status: statusCode } = resp;
                const { data: res } = resp;
                // set captha logic needed
                if (res && statusCode === 200 && res.success === true) {
                    Notficiation.Success({
                        msg: "Password Changed"
                    });
                    setForm(initForm);
                }
                else{
                    Notficiation.Error({
                        msg: "Wrong Password !"
                    });
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
                setFormLoading(false);
            });
        }
    }

    return(

        

        <div className="max-w-md sm:m-auto sm:m-0 lg:ml-3 w-full">
        <div>
            <h2 className="mt-3 m-3 text-center text-3xl leading-9 font-bold text-gray-800 uppercase">
                Change Password
            </h2>
        </div>
        <form onSubmit={handleSubmit} className={`bg-white shadow-lg mt-4 rounded px-8 pt-6 pb-8 my-20 ${ currentUser.data.data.type==="customer" ? "bg-gray-200" : "bg-white"}`}>
        <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        aria-label="Password"
                        name="currentPassword"
                        type="password"
                        value={form.currentPassword}
                        onChange={handleChange}
                        className={`shadow appearance-none border ${error.currentpassword ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        placeholder="******************" />
                    <div className="text-xs italic text-red-500">{error.currentpassword}</div>
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
            <div className="h-10">
                <p className="text-red-500 text-xs italic bold text-center mt-2">{formError}</p>
            </div>
            <div className="flex items-center justify-between sm:flex-row">
                <button type="submit" className={`flex items-center ${formLoading ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-800"} text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline`}>
                    <svg className={`h-5 w-5 ${formLoading ? "text-gray-400" : "text-indigo-500"} transition ease-in-out duration-150 mr-1`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Change Password
                 </button>
            </div>
        </form>
    </div>
    )
}