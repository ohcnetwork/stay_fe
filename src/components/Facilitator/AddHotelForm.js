import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAddHotel } from "../../Redux/actions";
import * as Notficiation from "../../util/Notifications";
import { navigate } from "hookrouter";
import  {phonePreg} from "../../util/validation"
export default function AddHotelForm() {


  const dispatch = useDispatch();

  const state = useSelector(state => state);
    const { currentUser: temp } = state;
    const currentUser = temp.data.data;
    console.log("I am",currentUser.id);

  const initForm = {
    name: "",
    ownerID: currentUser.id,
    address: "",
    panchayath: "",
    district: "",
    starCategory: "",
    latitude: "11.1",
    longitude: "2.1",
    facilities: "",
    photos: "photo",
    contact: "",
    policy: "",
  };
  const initError = {
    name: "",
    address: "",
    panchayath: "",
    district: "",
    starCategory: "",
    latitude: "11.1",
    longitude: "2.1",
    facilities: "",
    photos: "",
    contact: "",
    policy: "",
  };
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState(initForm);
  const [error, setError] = useState(initError);
  const [formError, setFormError] = useState(false);
  const [star, setStar] = useState("");
  const [checkbox, setCheckbox] = useState({
    pool: false,
    wifi: false,
    parking: false,
    cctv: false
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
    setCheckbox({...checkbox, [name]: !prevState});
  }

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);
    const { contact } = form;


    Object.keys(form).forEach((key) => {
      if (form[key] === "") {
        formValid = false;
        err[key] = "This field is required";
      }
    });
   
    if(!phonePreg(contact)){
      formValid = false;
       err["contact"]="Enter Valid phone number"
    };

 

    setError(err);
    return formValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  console.log(validInputs(),"hey",formLoading);

    let submitData = form;
    submitData.facilities = Object.keys(checkbox).filter(el => checkbox[el]).join(",");
    console.log(submitData);

     if (validInputs() && !formLoading) {
       console.log("AddHotelForm.js: ", "creating a new hotel", form);
       setFormLoading(true);
       dispatch(postAddHotel(currentUser.id,submitData)).then((resp) => {
         const { status: statusCode } = resp;
         const { data: res } = resp;
         console.log(res);


         // set captha logic needed
         if (res && statusCode === 201 && res.success === true) {
           Notficiation.Success({
             msg: "Hotel Created, Add Room Details",
           });
          //  navigate("/add-room");
          // navigate(`add-room/${res.data.hotelId}`);
          navigate(`${res.data.hotelId}/room/add `);

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
       });
     }
  };

  return (

    // class="p-3 bg-indigo-400 text-white w-full hover:bg-indigo-300"    
    <div className="h-full  overflow-x-hidden flex items-center justify-center bg-gray-400 ">
      <div className="leading-loose">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl  m-4 p-10 bg-white rounded shadow-xl"
        >
          <p className="text-gray-800 font-medium text-center">
            Hotel information
          </p>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="name">
              Hotel Name
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="hotel-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              required=""
              placeholder="Enter Hotel Name"
              aria-label="Name"
            />
            <div className="text-xs italic text-red-500">{error.name}</div>
          </div>
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="address">
              Address
            </label>
            <textarea
              className="form-textarea w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              type="text"
              required=""
              placeholder="Enter Hotel Address"
              aria-label="Name"
            />
                        <div className="text-xs italic full-width text-red-500">{error.address}</div>

          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label
              className="block text-sm text-gray-600 "
              htmlFor="panchayath"
            >
              Panchayath
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="panchayath"
              name="panchayath"
              value={form.panchayath}
              onChange={handleChange}
              type="text"
              required=""
              placeholder="Enter Panchayat"
              aria-label="Name"
            />

          </div>
          <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label className="block text-sm text-gray-600 " htmlFor="district">
              District
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="district"
              name="district"
              value={form.district}
              onChange={handleChange}
              type="text"
              required=""
              placeholder="Enter District"
              aria-label="Name"
            />

          </div>

          <div className="mt-2">
            <label
              className="block text-sm text-gray-600 "
              htmlFor="starCategory"
            >
              Star Category
            </label>

            <div className="flex mb-4 bg-gray-200">
              <label className="inline-flex px-5 items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="starCategory"
                  checked={star === "1"}
                  value="1"
                  onChange={handleChange}
                  onClick={() => setStar("1")}
                />
                <span className="ml-2 text-gray-600">1 star</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="starCategory"
                  checked={star === "2"}
                  value="2"
                  onChange={handleChange}
                  onClick={() => setStar("2")}
                />
                <span className="ml-2  text-gray-600">2 star</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="starCategory"
                  checked={star === "3"}
                  value="3"
                  onChange={handleChange}
                  onClick={() => setStar("3")}
                />
                <span className="ml-2  text-gray-600">3 star</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="starCategory"
                  checked={star === "4"}
                  value="4"
                  onChange={handleChange}
                  onClick={() => setStar("4")}
                />
                <span className="ml-2  text-gray-600">4 star</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="starCategory"
                  checked={star === "5"}
                  value="5"
                  onChange={handleChange}
                  onClick={() => setStar("5")}
                />
                <span className="ml-2  text-gray-600">5 star</span>
              </label>
            </div>
          </div>

          <div className="mt-2  ">
            <label
              className="block text-sm text-gray-600 "
              htmlFor="facilities"
            >
              Facilities
            </label>
            <div className="flex mb-4 bg-gray-200">
              <div className="w-1/4 px-5 py-1 flex items-center">
                <input
                  id="pool"
                  type="checkbox"
                  name="pool"
                  checked={checkbox.pool}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  onClick={handleCheckbox}
                />
                <label
                  htmlFor="pool"
                  className="ml-2 block text-sm leading-5 text-gray-700"
                >
                  Pool
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
                  id="CCTV"
                  type="checkbox"
                  name="cctv"
                  checked={checkbox.cctv}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleCheckbox}
                />
                <label
                  htmlFor="CCTV"
                  className="ml-2 block text-sm leading-5 text-gray-700"
                >
                  CCTV
                </label>
              </div>
              <div className="w-1/4 px-5 flex items-center">
                <input
                  id="parking"
                  type="checkbox"
                  name="parking"
                  checked={checkbox.parking}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleCheckbox}
                />
                <label
                  htmlFor="parking"
                  className="ml-2 block text-sm leading-5 text-gray-700"
                >
                  Parking
                </label>
              </div>
            </div>
          </div>

          {/* File upload */}
          <div className="mt-2">
            <label className="block text-sm text-gray-600 " htmlFor="photos">
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
          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="contact">
              Contact Number
            </label>
            <input
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="contact"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              type="text"
              required=""
              placeholder="Enter Contact Number"
              aria-label="Name"
            />
            <div className="text-xs italic text-red-500">{error.contact}</div>

          </div>

          <div className="mt-2">
            <label className="block text-sm text-gray-600" htmlFor="policy">
              Policy
            </label>
            <textarea
              className="form-textarea w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="policy"
              name="policy"
              value={form.policy}
              onChange={handleChange}
              type="text"
              required=""
              placeholder="Enter Hotel Policies"
              aria-label="Name"
            />
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
  );
}