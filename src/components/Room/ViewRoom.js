import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomByRoomid,
  getHotelByRoomid,
  dopostBook,
  changeRoomStatus,
} from "../../Redux/actions";
import { navigate } from "hookrouter";
import * as Notficiation from "../../util/Notifications";

export default function ViewRoom({ id }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentUser } = state;

  const [detail, setDetail] = useState(false);
  const [hdetail, sethDetail] = useState(false);
  useEffect(() => {
    dispatch(getRoomByRoomid(id)).then((res) => {
      setDetail(res.data);
    });
    dispatch(getHotelByRoomid(id)).then((resp) => {
      sethDetail(resp.data.data);
    });
  }, []);
  const roomid = id;
  console.log("room id", roomid);

  const hotelid = hdetail.hotelId;
  console.log("hotelid", hotelid);

  const confirm = () => {
    if (currentUser && currentUser.data) {
      console.log("user id", currentUser.data.data.id);
      const userid = currentUser.data.data.id;
      console.log("logged in");
      const body = {
        checkin: "2020-05-15",
        checkout: "2020-05-29",
      };

      dispatch(dopostBook(userid, id, hotelid, body)).then((res) => {});
      const status = {
        status: "NOT_AVAILABLE",
      };
      dispatch(changeRoomStatus(roomid, status));
      Notficiation.Error({
        msg: "Booking Successfull",
      });
      navigate("/browse");
    } else {
      console.log("not");
      Notficiation.Success({
        msg: "Please login to confirm your booking",
      });
      navigate("/login");
      //not logged in
    }
  };

  return (
    <div className="py-10 bg-gray-300 h-full">
      <div className="max-w-5xl mx-auto bg-white shadow overflow-hidden  sm:rounded-lg">
        <div className="bg-white lg:mx-8 lg:my-4 lg:flex lg:max-w-5xl">
          <div className="lg:w-1/2">
            <img
              className="h-64 bg-cover lg:rounded-lg "
              src="https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
              alt=""
            />
          </div>
          <div className="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
            <h2 className="text-3xl text-gray-800 font-bold">{hdetail.name}</h2>
            <p className="mt-4 text-gray-600">{hdetail.description}</p>
            <div className="mt-8">
              <button
                onClick={confirm}
                className="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {detail.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
            {detail.description}
          </p>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 col-gap-4 row-gap-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Category
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900">
                {detail.category}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Beds
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900">
                {detail.beds}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Address
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900">
                {hdetail.address}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Cost
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900">
                Rs.{detail.cost}
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Amenities
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900">
                <ul className="border border-gray-200 rounded-md">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">
                        {detail.features}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                        </svg>
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
