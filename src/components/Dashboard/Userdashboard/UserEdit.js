import React, { useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { changePassword  } from "../../../Redux/actions"
import * as Notficiation from "../../../util/Notifications";

export default function UserEdit() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { currentUser } = state;
    const initForm = {
        id:currentUser.data.data.id,
        currentPassword:"",
        password: "",
        confirm: ""
    };
    const initForm2 = {
      id:currentUser.data.data.id,
      name: currentUser.data.data.name,
      mobno: "",
      email: currentUser.data.data.email
  };
    const initError = {
        id:currentUser.data.data.id,
        password: "",
        confirm: "",
    };
    const initError2 = {
      id:currentUser.data.data.id,
      name:"",
      mobno: "",
      email: ""
  };

    const [formLoading, setFormLoading] = useState(false);
    const [form, setForm] = useState(initForm);
    const [error, setError] = useState(initError);
    const [formError, setFormError] = useState(false);

    const [formLoading2, setFormLoading2] = useState(false);
    const [form2, setForm2] = useState(initForm2);
    const [error2, setError2] = useState(initError2);
    const [formError2, setFormError2] = useState(false);

    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...form }

        // error handling needed

        fieldValue[name] = name === "email" ?
            value.toLowerCase() :
            value

        setForm(fieldValue)
    };
    const handleChange2 = (e) => {
      const { value, name } = e.target;
      const fieldValue2 = { ...form2 }

      // error handling needed

      fieldValue2[name] = name === "email" ?
          value.toLowerCase() :
          value

      setForm2(fieldValue2)
  };
  const handleSubmit2 =(e) =>{
    e.preventDefault();
    console.log("submit")
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

        setError(err);
        return formValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        form.id=3;
      //  form.currentPassword="Qwerty@123";
        console.log(validInputs());
      
        if (validInputs() && !formLoading) {
          
            setFormLoading(true);
            dispatch(changePassword(form)).then(resp => {
                const { status: statusCode } = resp;
                const { data: res } = resp;
                
                // set captha logic needed
                if (res && statusCode === 200 && res.success === true) {
                    Notficiation.Success({
                        msg: "Password Changed"
                    });
                }

                let formErr = "Some problem occurred";
                // error exists show error 
                if (res && res.success === false && res.data) {
                    formErr = Object.values(res.data)[0];
                    
                }
                if(res.success === true){
                  formErr= "";
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
            });
        }
    }

    return (
        <div className="h-full lg:flex sm:flex-column  items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md sm:h-1/4 lg:mr-3 w-full">
                <div>
                    <h2 className="mt-3 text-center text-3xl leading-9 font-bold text-gray-800 uppercase">
                        Change Details
                    </h2>
                </div>
                <form onSubmit={handleSubmit2} className="bg-white shadow-lg mt-4 rounded px-8 pt-6 pb-8 my-20 bg-gray-200">
                <div className="mb-4 md:mr-2 md:mb-0">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                               Full Name
                            </label>
                            <input
                                aria-label="Password"
                                name="currentPassword"
                                type="text"
                                value={form2.name}
                                onChange={handleChange}
                                className={`shadow appearance-none border ${error2.password ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                placeholder="******************" />
                            <div className="text-xs italic text-red-500">{error2.password}</div>
                        </div>

                    
                   
                    <div className="mb-4 sm:h-1/4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Email id
                            </label>
                            <input
                                aria-label="Password"
                                name="email"
                                type="email"
                                value={form2.email}
                                onChange={handleChange2}
                                className={`shadow appearance-none border ${error2.password ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                placeholder="******************" />
                            <div className="text-xs italic text-red-500">{error2.password}</div>
                        </div>
                        <div className="md:ml-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm">
                                Mobile Number
                            </label>
                            <input
                                aria-label="Confirm Password"
                                name="mobno"
                                type="text"
                                value={form2.mobno}
                                onChange={handleChange2}
                                className={`shadow appearance-none border ${error2.confirm ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                placeholder="******************" />
                            <div className="text-xs italic text-red-500">{error2.confirm}</div>
                        </div>
                    </div>
                    <div className="h-10">
                        <p className="text-red-500 text-xs italic bold text-center mt-2">{formError2}</p>
                    </div>
                    <div className="flex items-center justify-between sm:flex-row">
                        <button type="submit" className={`flex items-center ${formLoading ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-800"} text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline`}>
                            <svg className={`h-5 w-5 ${formLoading ? "text-gray-400" : "text-indigo-500"} transition ease-in-out duration-150 mr-1`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Change Details
                         </button>
                    </div>
                </form>
            </div>


            <div className="max-w-md lg:ml-3 w-full">
                <div>
                    <h2 className="mt-3 m-3 text-center text-3xl leading-9 font-bold text-gray-800 uppercase">
                        Change Password
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="bg-white mt-4 shadow-lg rounded px-8 pt-6 pb-8 my-20 bg-gray-200">
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
                                className={`shadow appearance-none border ${error.password ? "border-red-500" : ""} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                placeholder="******************" />
                            <div className="text-xs italic text-red-500">{error.password}</div>
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
        </div>
    );
}
