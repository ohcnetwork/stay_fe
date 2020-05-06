import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postAddRooms } from "../../Redux/actions";
import * as Notficiation from "../../util/Notifications";
import { navigate } from "hookrouter";
import { isNumber } from "../../util/validation";
import UploadImage from "./UploadImage";

export default function AddRoom({ id }) {
    const dispatch = useDispatch();
    const initForm = {
        title: "",
        features: null,
        description: "",
        category: "",
        beds: "",
        noOfRooms: "",
        cost: "",
    };
    const initError = {
        title: "",
        description: "",
        category: "",
        beds: "",
        photos: "",
        noOfRooms: "",
        cost: "",
    };
    const optionalValues = ["features"];
    const myInput = useRef();
    useEffect(() => {
        myInput.current && myInput.current.focus();
    }, []);
    const [formLoading, setFormLoading] = useState(false);
    const [form, setForm] = useState(initForm);
    const [error, setError] = useState(initError);
    const [formError, setFormError] = useState(false);
    const [category, setCategory] = useState("");
    const [checkbox, setCheckbox] = useState({
        ac: false,
        wifi: false,
        mini_fridge: false,
        geyser: false,
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        const fieldValue = { ...form };

        // error handling needed

        fieldValue[name] = fieldValue[name] = value;

        setForm(fieldValue);
    };

    const handleCheckbox = (e) => {
        const { name } = e.target;
        const prevState = checkbox[name];
        const newState = { ...checkbox, [name]: !prevState };
        setCheckbox(newState);
        setForm({
            ...form,
            features: Object.keys(newState)
                .filter((el) => newState[el])
                .join(","),
        });
    };

    const setFiles = (files) => {
        setForm({ ...form, file: files });
    };

    function validInputs() {
        let formValid = true;
        let err = Object.assign({}, initError);
        const { beds, noOfRooms, cost } = form;

        Object.keys(form).forEach((key) => {
            if (form[key] === "" && !optionalValues.includes(key)) {
                formValid = false;
                err[key] = "This field is required";
            }
        });
        if (!isNumber(beds)) {
            formValid = false;
            err["beds"] = "Enter Valid number";
        }
        if (!isNumber(noOfRooms)) {
            formValid = false;
            err["noOfRooms"] = "Enter Valid number";
        }
        if (!isNumber(cost)) {
            formValid = false;
            err["cost"] = "Enter Valid number";
        }

        setError(err);
        return formValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validInputs() && !formLoading) {
            console.log("AddHotelForm.js: ", "creating a new hotel", form);
            const formData = new FormData();

            Object.keys(form).forEach((key) => {
                if (key === "file") {
                    form[key].forEach((el) => {
                        formData.append(key, el);
                    });
                } else {
                    formData.append(key, form[key]);
                }
            });
            setFormLoading(true);
            dispatch(postAddRooms(id, formData)).then((resp) => {
                const { status: statusCode } = resp;
                const { data: res } = resp;
                console.log(resp);

                // set captha logic needed
                if (res && statusCode === 201) {
                    Notficiation.Success({
                        msg: "Room Created",
                    });
                    navigate(`/hotel/${id}`);
                } else {
                    let formErr = "Some problem occurred";

                    setFormError(formErr);
                    setFormLoading(false);
                }
            });
        }
    };

    return (
        <div>
            <div className="overflow-x-hidden flex items-center justify-center">
                <div className="leading-loose">
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-xl  m-4 p-10 bg-white rounded shadow-xl">
                        <p className="text-gray-800 font-medium text-center">
                            Room Details
                        </p>
                        <div className="mt-2">
                            <label
                                className="block text-sm text-gray-600"
                                htmlFor="title">
                                Title
                            </label>
                            <input
                                ref={myInput}
                                className="w-full focus:shadow-outline px-5 py-1 text-gray-700 bg-gray-200 rounded"
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                type="text"
                                required=""
                                placeholder="Enter Title"
                                aria-label="Name"
                            />
                            <div className="text-xs italic text-red-500">
                                {error.title}
                            </div>
                        </div>
                        <div className="mt-2">
                            <label
                                className="block text-sm text-gray-600"
                                htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="form-textarea w-full focus:shadow-outline px-5 py-1 text-gray-700 bg-gray-200 rounded"
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                type="text"
                                required=""
                                placeholder="Enter Room Description"
                                aria-label="Name"
                            />
                            <div className="text-xs italic text-red-500">
                                {error.description}
                            </div>
                        </div>

                        <div className="mt-2">
                            <label
                                className="block text-sm text-gray-600 "
                                htmlFor="features">
                                Room Features
                            </label>

                            <div className="mt-2 bg-gray-200 flex flex-wrap sm:justify-around justify-center">
                                <label className="inline-flex  items-center mx-3">
                                    <input
                                        id="AC"
                                        type="checkbox"
                                        name="ac"
                                        checked={checkbox.ac}
                                        className="form-checkbox h-4 w-4 focus:shadow-outline text-indigo-600 transition duration-150 ease-in-out"
                                        onChange={handleCheckbox}
                                    />
                                    <span className="ml-2 text-gray-600">
                                        AC
                                    </span>
                                </label>
                                <label className="inline-flex items-center mx-3">
                                    <input
                                        id="wifi"
                                        type="checkbox"
                                        name="wifi"
                                        checked={checkbox.wifi}
                                        className="form-checkbox h-4 w-4 focus:shadow-outline text-indigo-600 transition duration-150 ease-in-out"
                                        onChange={handleCheckbox}
                                    />
                                    <span className="ml-2  text-gray-600">
                                        Wifi
                                    </span>
                                </label>
                                <label className="inline-flex items-center mx-3">
                                    <input
                                        id="mini-fridge"
                                        type="checkbox"
                                        name="mini_fridge"
                                        checked={checkbox.mini_fridge}
                                        className="form-checkbox h-4 w-4 focus:shadow-outline text-indigo-600 transition duration-150 ease-in-out"
                                        onChange={handleCheckbox}
                                    />
                                    <span className="ml-2  text-gray-600">
                                        Mini Fridge
                                    </span>
                                </label>
                                <label className="inline-flex items-center mx-3">
                                    <input
                                        id="geyser"
                                        type="checkbox"
                                        name="geyser"
                                        checked={checkbox.geyser}
                                        className="form-checkbox h-4 w-4 focus:shadow-outline text-indigo-600 transition duration-150 ease-in-out"
                                        onChange={handleCheckbox}
                                    />
                                    <span className="ml-2  text-gray-600">
                                        Geyser
                                    </span>
                                </label>
                            </div>
                            {/* <div className="text-xs italic text-red-500">
                                {error.features}
                            </div> */}
                        </div>

                        <div className="mt-2">
                            <label
                                className="block text-sm text-gray-600 "
                                htmlFor="Category">
                                Category
                            </label>

                            <div className="mt-2 bg-gray-200">
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio focus:shadow-outline h-4 w-4"
                                        name="category"
                                        checked={category === "hostel"}
                                        value="hostel"
                                        onChange={handleChange}
                                        onClick={() => setCategory("hostel")}
                                    />
                                    <span className="ml-2  text-gray-600">
                                        Hostel
                                    </span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio focus:shadow-outline h-4 w-4"
                                        name="category"
                                        checked={category === "economy"}
                                        value="economy"
                                        onChange={handleChange}
                                        onClick={() => setCategory("economy")}
                                    />
                                    <span className="ml-2 text-gray-600">
                                        Economy
                                    </span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio focus:shadow-outline h-4 w-4"
                                        name="category"
                                        checked={category === "standard"}
                                        value="standard"
                                        onChange={handleChange}
                                        onClick={() => setCategory("standard")}
                                    />
                                    <span className="ml-2  text-gray-600">
                                        Standard
                                    </span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio focus:shadow-outline h-4 w-4"
                                        name="category"
                                        checked={category === "premium"}
                                        value="premium"
                                        onChange={handleChange}
                                        onClick={() => setCategory("premium")}
                                    />
                                    <span className="ml-2  text-gray-600">
                                        Premium
                                    </span>
                                </label>
                            </div>
                            <div className="text-xs italic text-red-500">
                                {error.category}
                            </div>
                        </div>

                        <div className="inline-block mt-2 w-1/2 pr-1">
                            <label
                                className="block text-sm text-gray-600 "
                                htmlFor="noOfRooms">
                                Number of Rooms
                            </label>
                            <input
                                className="w-full px-5 py-1 focus:shadow-outline text-gray-700 bg-gray-200 rounded"
                                id="noOfRooms"
                                name="noOfRooms"
                                value={form.noOfRooms}
                                onChange={handleChange}
                                type="text"
                                required=""
                                placeholder="Enter the number of rooms"
                                aria-label="Name"
                            />
                            <div className="text-xs italic text-red-500">
                                {error.noOfRooms}&nbsp;
                            </div>
                        </div>
                        <div className="inline-block mt-2 w-1/2 pr-1">
                            <label
                                className="block text-sm text-gray-600 "
                                htmlFor="cost">
                                Bed Capacity Per Room
                            </label>
                            <input
                                className="w-full px-5 py-1 focus:shadow-outline text-gray-700 bg-gray-200 rounded"
                                id="beds"
                                name="beds"
                                value={form.beds}
                                onChange={handleChange}
                                type="text"
                                required=""
                                placeholder="Bed Capacity"
                                aria-label="Name"
                            />
                            <div className="text-xs italic text-red-500">
                                {error.beds}&nbsp;
                            </div>
                        </div>
                        <div className="inline-block mt-2  pr-1">
                            <label
                                className="block text-sm text-gray-600 "
                                htmlFor="cost">
                                Rent (Per day tariff including GST)
                            </label>
                            <input
                                className="w-full px-5 py-1 focus:shadow-outline text-gray-700 bg-gray-200 rounded"
                                id="cost"
                                name="cost"
                                value={form.cost}
                                onChange={handleChange}
                                type="text"
                                required=""
                                placeholder="Enter the Room Rent Per Day"
                                aria-label="Name"
                            />
                            <div className="text-xs italic text-red-500">
                                {error.cost}
                            </div>
                        </div>

                        {/* File upload */}
                        <div className="mt-2">
                            <label
                                className="block text-sm text-gray-600 "
                                htmlFor="photos">
                                Upload photos (maximum 5)
                            </label>

                            <UploadImage
                                setFiles={setFiles}
                                formLoading={formLoading}
                            />
                        </div>
                        <div className="h-10">
                            <p className="text-red-500 text-xs italic bold text-center mt-2">
                                {formError}
                            </p>
                        </div>

                        <div className="mt-2 flex items-center">
                            <button
                                className={`px-4 py-1 text-white font-bold tracking-wider ${
                                    formLoading
                                        ? "bg-gray-600 cursor-default"
                                        : "bg-indigo-600 hover:bg-indigo-800"
                                } rounded`}
                                type="submit">
                                Submit
                            </button>
                            {formLoading && (
                                <div className="ml-3 text-gray-700 text-sm">
                                    Uploading images and submitting data...
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
