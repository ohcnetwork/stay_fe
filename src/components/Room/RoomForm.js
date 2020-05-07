import React, { useState, useRef, useEffect } from "react";
import { isNumber } from "../../util/validation";
import UploadImage from "../Facilitator/UploadImage";
import { BED_COUNT } from "../../Common/constants";

export default function RoomForm({
    initForm,
    onSubmit,
    formLoading,
    formError,
    initFeatures,
    editMode = false,
    count = "",
}) {
    const optionalValues = ["features"];

    let initError = {};
    Object.keys(initForm).forEach((formKey) => (initError[formKey] = ""));

    const myInput = useRef();
    useEffect(() => {
        window.scrollTo(0, 0);
        myInput.current && myInput.current.focus();
    }, []);
    const [form, setForm] = useState(initForm);
    const [error, setError] = useState(initError);
    const [category, setCategory] = useState("");
    const [checkbox, setCheckbox] = useState(initFeatures);

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
        if (!isNumber(noOfRooms) && !editMode) {
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

            onSubmit(formData);
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
                            {editMode
                                ? `Editing ${count} Room(s)`
                                : "Room Details"}
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
                                        checked={form.category === "hostel"}
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
                                        checked={form.category === "economy"}
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
                                        checked={form.category === "standard"}
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
                                        checked={form.category === "premium"}
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

                        {!editMode && (
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
                                    placeholder="Enter the number of rooms"
                                    aria-label="Name"
                                />
                                <div className="text-xs italic text-red-500">
                                    {error.noOfRooms}&nbsp;
                                </div>
                            </div>
                        )}
                        <div className="inline-block mt-2 w-1/2 pr-1">
                            <label
                                className="block text-sm text-gray-600 "
                                htmlFor="bed-capacity">
                                Bed Capacity Per Room
                            </label>
                            {/* <input
                                className="w-full px-5 py-1 focus:shadow-outline text-gray-700 bg-gray-200 rounded"
                                id="beds"
                                name="beds"
                                value={form.beds}
                                onChange={handleChange}
                                type="text"
                                placeholder="Number of Beds"
                                aria-label="Name"
                            /> */}
                            <div className="relative">
                                <select
                                    className="appearance-none focus:shadow-outline w-full py-1 px-5 py-1 text-gray-700 bg-gray-200 rounded"
                                    name="beds"
                                    value={form.beds}
                                    onChange={handleChange}
                                    aria-label="Enter Bed Count per room">
                                    {BED_COUNT.map((el) => (
                                        <option value={el.text} key={el.text}>
                                            {el.text}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
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
                            {editMode && (
                                <div className="text-xs italic text-gray-600">
                                    {" "}
                                    Uploading new images will remove all the
                                    previous images
                                </div>
                            )}
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
