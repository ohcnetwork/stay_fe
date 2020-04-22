import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as Notficiation from "../../util/Notifications";

import { getBookingHistory, deleteBooking } from "../../Redux/actions";
import { DEFAULT_IMAGE } from "../../Common/constants";

export default function ViewRoom() {


  var item = [];
  const state = useSelector(state => state);
  const { currentUser } = state;
  const user = currentUser.data.data;

  const dispatch = useDispatch();

  const [form, setForm] = useState({});
  const [form2, setForm2] = useState({});
  const [form3, setForm3] = useState("ALL");

  var i = 0;


  const Cancel = (e) => {
    if (window.confirm("Cancel")) {
      dispatch(deleteBooking(e.target.name)).then(resp => {
        const { status: statusCode } = resp;
        if (statusCode === 200) {
          Notficiation.Success({
            msg: "Booking Cancelled"
          });
        }
      });
    }
    setForm2(Math.random() * 10);
  }

  useEffect(() => {
    dispatch(getBookingHistory()).then(resp => {
      const { data: res } = resp;
      setForm(res);
    });

  }, [dispatch, user, form2 ]);
  var count = 0 ;
  if(form !== undefined){
  count = form.length;
  for (i = 0; i < count; i++) {
    item = item.concat(form[count - 1 - i]);
  }
}
  


  if (count === 0) {
    return (
      <div className="py-10 bg-white min-h-full">
        <div className="text-center">
          <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Booking History
              </h2>
        </div>
        <div className="w-2/6 bg-gray-300 p-10  my-8 mx-auto  text-center rounded overflow-hidden shadow-lg">
          <h3 className=" m-0 text-lg m-auto">No Booking History !</h3>
        </div>
      </div>
    );
  }


  else return (
    <div className="py-10 bg-white min-h-full">
      <div className="max-w-5xl  mx-auto   overflow-hidden  sm:rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            Booking History
          </h2>
          <div className="flex mt-3  lg:text-md text-sm w-5/6 flex-row bg-gray-200 lg:w-1/2 m-0 m-auto ">
            <div className="text-center w-1/3  px-3 py-2 m-1">
              <button className="bg-white w-full hover:bg-blue-500 text-blue-700 font-semibold mt-1  hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded" onClick={() => setForm3("ALL")}>ALL</button>
            </div>
            <div className=" text-center w-1/3  px-3 py-2 m-1">
              <button className="bg-white w-full hover:bg-blue-500 text-blue-700 font-semibold mt-1  hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded" onClick={() => setForm3("BOOKED")}>BOOKED</button>
            </div>
            <div className=" text-center w-1/3 px-3 py-2 m-1">
              <button className="bg-white w-full hover:bg-blue-500 text-blue-700 font-semibold mt-1  hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded" onClick={() => setForm3("CANCELLED")}>CANCELLED</button>
            </div>
          </div>
        </div>
        <div className="relative  content-center  m-8 lg:mx-8 lg:my-4 lg:max-w-5xl">
          {item.map((value, index) => {
            if (value.statusBooking === form3 || form3 === "ALL")
              return (
                <div id={index} className="sm:w-full lg:w-1/2 md:w-3/4 bg-gray-300 mx-auto my-8  rounded overflow-hidden shadow-lg">
                  <img className="w-full  h-30" src={DEFAULT_IMAGE.HOTEL} alt={value.name} />
                  <div className="px-3 py-4">
                    <div className="font-bold flex text-xl mb-2">
                      <div className="w-1/2">{value.room.facility.name}</div>
                      <div className="m-0 m-auto">{
                        value.statusBooking === "BOOKED" &&
                        <button onClick={Cancel} value={value.statusBooking} name={value.book_id} className="bg-white hover:bg-blue-500 text-blue-700 font-semibold mt-1  hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                          Cancel
                         </button>
                      }
                      </div>
                    </div>
                    <ul className="text-gray-700 text-base">
                      <li>Room Type : {value.room.category}</li>
                      <li>Booking Date : {new Date(value.createdAt).toLocaleString()}</li>
                      <li>Checkin : {new Date(value.checkin).toLocaleString()}</li>
                      <li>Checkout : {new Date(value.checkout).toLocaleString()}</li>
                      <li>
                      <div className="flex w-full   flex-row  ">
                      <div className=" w-1/2  ">
                      Booking status : {value.statusBooking}
                      </div>
                      <div className="w-1/2 ">
                      Checkin status : {value.statusCheckin}
                      </div>
                      </div>
                      </li>
                      <li>Cost : Rs {value.room.cost}</li>
                    </ul>
                  </div>
                </div>
              )
          })}
        </div>
      </div>
    </div>)
}
