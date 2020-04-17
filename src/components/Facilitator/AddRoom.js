import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAddRooms } from "../../Redux/actions";
import * as Notficiation from "../../util/Notifications";
import { navigate } from "hookrouter";

export default function AddRoom(props) {
  const [state]=useState({
    id:props.id,
  });

  const dispatch = useDispatch();
  const initForm = {
    title: "",
    hotelId:"",
    features: "",
    description: "",
    category: "",
    beds: "",
    photos: "photo",
    noOfRooms: "",
    cost: "",

  };
  const initError = {
    title: "",
    hotelId:"",
    features: "",
    description: "",
    category: "",
    beds: "",
    photos: "photo",
    noOfRooms: "",
    cost: "",

  };
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
    setCheckbox({ ...checkbox, [name]: !prevState });
  };

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);

    Object.keys(form).forEach((key) => {
      if (form[key] === "") {
        formValid = false;
        err[key] = "This field is required";
      }
    });
    setError(err);
    return formValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // form[facilities] = Object.keys(checkbox).map(...).join(",");

    let submitData = form;
    submitData.features= Object.keys(checkbox).filter((el) => checkbox[el]).join(",");
    console.log(submitData);

    if (validInputs() && !formLoading) {
      console.log("AddHotelForm.js: ", "creating a new hotel", form);
      setFormLoading(true);
      dispatch(postAddRooms(form)).then((resp) => {
        const { status: statusCode } = resp;
        const { data: res } = resp;
        console.log(resp);

        // set captha logic needed
        if (res && statusCode === 201 ) {
          Notficiation.Success({
            msg: "Hotel Created",
          });
          // navigate("/add-rooms");
        }

        let formErr = "Some problem occurred";
        // error exists show error
        if (res && res.data) {
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
      });
    }
  };

  return (
    <div>
      <div className="h-screen  overflow-hidden flex items-center justify-center bg-gray-400 ">
        <div className="leading-loose">
          <form
            onSubmit={handleSubmit}
            className="max-w-xl  m-4 p-10 bg-white rounded shadow-xl"
          >
            <p className="text-gray-800 font-medium text-center">
              Room Details
            </p>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="title">
                Title
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                type="text"
                required=""
                placeholder="Enter Title"
                aria-label="Name"
              />
              <div className="text-xs italic text-red-500">{error.name}</div>
            </div>
            <div className="mt-2">
              <label
                className="block text-sm text-gray-600"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="form-textarea w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                type="text"
                required=""
                placeholder="Enter Room Description"
                aria-label="Name"
              />
            </div>
            <div className="mt-2  ">
              <label
                className="block text-sm text-gray-600 "
                htmlFor="features"
              >
                Room Features
              </label>
              <div className="flex mb-4 bg-gray-200">
                <div className="w-1/4 px-5 py-1 flex items-center">
                  <input
                    id="AC"
                    type="checkbox"
                    name="ac"
                    checked={checkbox.ac}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    onClick={handleCheckbox}
                  />
                  <label
                    htmlFor="AC"
                    className="ml-2 block text-sm leading-5 text-gray-700"
                  >
                    AC
                  </label>
                </div>
                <div className="w-1/4 px-5 flex items-center">
                  <input
                    id="wifi"
                    type="checkbox"
                    name="wifi"
                    checked={checkbox.wifi}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    onChange={handleCheckbox}
                  />
                  <label
                    htmlFor="wifi"
                    className="ml-2 block text-sm leading-5 text-gray-700"
                  >
                    Wifi
                  </label>
                </div>
                <div className="w-1/4 px-5 flex items-center">
                  <input
                    id="mini-fridge"
                    type="checkbox"
                    name="mini_fridge"
                    checked={checkbox.mini_fridge}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    onChange={handleCheckbox}
                  />
                  <label
                    htmlFor="mini-fridge"
                    className="ml-2 block text-sm leading-5 text-gray-700"
                  >
                    Mini Fridge
                  </label>
                </div>
                <div className="w-1/4 px-5 flex items-center">
                  <input
                    id="geyser"
                    type="checkbox"
                    name="geyser"
                    checked={checkbox.geyser}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    onChange={handleCheckbox}
                  />
                  <label
                    htmlFor="geyser"
                    className="ml-2 block text-sm leading-5 text-gray-700"
                  >
                    Geyser
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <label
                className="block text-sm text-gray-600 "
                htmlFor="Category"
              >
                Category
              </label>

              <div className="flex mb-4 bg-gray-200">
                <label className="inline-flex px-5 items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="category"
                    checked={category === "economy"}
                    value="economy"
                    onChange={handleChange}
                    onClick={() => setCategory("economy")}
                  />
                  <span className="ml-2 text-gray-600">Economy</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="category"
                    checked={category === "standard"}
                    value="standard"
                    onChange={handleChange}
                    onClick={() => setCategory("standard")}
                  />
                  <span className="ml-2  text-gray-600">Standard</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="category"
                    checked={category === "deluxe"}
                    value="deluxe"
                    onChange={handleChange}
                    onClick={() => setCategory("deluxe")}
                  />
                  <span className="ml-2  text-gray-600">Deluxe</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="category"
                    checked={category === "premium"}
                    value="premium"
                    onChange={handleChange}
                    onClick={() => setCategory("premium")}
                  />
                  <span className="ml-2  text-gray-600">Premium</span>
                </label>
              </div>
            </div>

            <div className="inline-block mt-2 w-1/2 pr-1">
              <label
                className="block text-sm text-gray-600 "
                htmlFor="noOfRooms"
              >
                Number of Rooms
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="noOfRooms"
                name="noOfRooms"
                value={form.noOfRooms}
                onChange={handleChange}
                type="text"
                required=""
                placeholder="Enter the number of rooms"
                aria-label="Name"
              />
            </div>
            <div className="inline-block mt-2 w-1/2 pr-1">
              <label className="block text-sm text-gray-600 " htmlFor="cost">
                Bed Capacity
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="beds"
                name="beds"
                value={form.beds}
                onChange={handleChange}
                type="text"
                required=""
                placeholder="Capacity"
                aria-label="Name"
              />
            </div>
            <div className="inline-block mt-2  pr-1">
              <label className="block text-sm text-gray-600 " htmlFor="cost">
                Enter the Cost
              </label>
              <input
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="cost"
                name="cost"
                value={form.cost}
                onChange={handleChange}
                type="text"
                required=""
                placeholder="Cost"
                aria-label="Name"
              />
            </div>

            {/* File upload */}
            <div className="mt-2">
              <label
                className="block text-sm text-gray-600 "
                htmlFor="cus_name"
              >
                Upload photos
              </label>

              <div class="flex w-full items-center px-5 bg-grey-lighter">
                <label class="w-20 flex flex-col items-center px-1 py-1 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span class="mt-2 text-xs leading-normal">Select a file</span>
                  <input type="file" class="hidden" />
                </label>
              </div>
            </div>
            <div className="h-10">
              <p className="text-red-500 text-xs italic bold text-center mt-2">
                {formError}
              </p>
            </div>

            <div className="mt-2">
              <button
                className="px-4 py-1 text-white w-full font-light tracking-wider bg-indigo-600 hover:bg-indigo-300 rounded "
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
