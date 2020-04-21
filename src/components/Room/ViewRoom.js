import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dopostBook, getHotelList } from "../../Redux/actions";
import { navigate, useQueryParams, usePath } from "hookrouter";
import * as Notficiation from "../../util/Notifications";
import DatePicker from "react-date-picker";

export default function ViewRoom({ id, category, startdate, enddate }) {
  const hotelid = id;
  console.log("id", id);
  console.log("category", category);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { currentUser } = state;
  const [queryParams, setQueryParams] = useQueryParams();
  const [avail, setavail] = useState(false);
  const [datein, setdatein] = useState({
    date: new Date(startdate),
  });
  const [dateout, setdateout] = useState({
    date: new Date(enddate),
  });
  // const type = "room";
  const [detail, setDetail] = useState(false);
  // const [hdetail, sethDetail] = useState(false);
  useEffect(() => {
    var startdates = datein.date.getTimezoneOffset() * 60000; //offset in milliseconds
    var checkin = new Date(datein.date - startdates)
      .toISOString()
      .slice(0, -14);

    var enddates = dateout.date.getTimezoneOffset() * 60000; //offset in milliseconds
    var checkout = new Date(dateout.date - enddates)
      .toISOString()
      .slice(0, -14);
    const form = {
      hotelid: hotelid,
      category: category,
      checkin: checkin,
      checkout: checkout,
      type: "room",
    };
    dispatch(getHotelList(form))
      .then((res) => {
        if (res) {
          setDetail(res.data[0]);
          setavail(true);
        } else {
          setavail(false);
        }
      })
      .catch((err) => {
        setavail(false);
      });
  }, []);

  const onDateChange = (newdate) => {
    setdatein({ date: newdate });
    setavail(false);
  };
  const onDateChange1 = (newdate1) => {
    setdateout({ date: newdate1 });
    setavail(false);
  };
  // const [avail, setavail] = useState(true);
  const currentURI = usePath();

  // booking button handle
  const confirm = () => {
    var startdates = datein.date.getTimezoneOffset() * 60000; //offset in milliseconds
    var checkin = new Date(datein.date - startdates)
      .toISOString()
      .slice(0, -14);

    var enddates = dateout.date.getTimezoneOffset() * 60000; //offset in milliseconds
    var checkout = new Date(dateout.date - enddates)
      .toISOString()
      .slice(0, -14);
    if (currentUser && currentUser.data) {
      //logged in

      const body = {
        // roomid: detail.id,
        hotelid: hotelid,
        category: category,
        checkin: checkin,
        checkout: checkout,
      };

      dispatch(dopostBook(body)).then((resp) => {
        const { data: res } = resp;
        const { status: statusCode } = resp;
        if (res && statusCode === 201) {
          Notficiation.Success({
            msg: "Booking Successfull",
          });
          navigate("/browse");
        } else {
          //not logged in
          Notficiation.Error({
            msg: "Please login to confirm your booking",
          });

          setQueryParams({ redirect: currentURI });
          navigate(`/login?${queryParams}`);
          //not logged in
        }
      });
    }
  };

  const onDateApply = () => {
    setavail(false);
    var startdates = datein.date.getTimezoneOffset() * 60000; //offset in milliseconds
    var checkin = new Date(datein.date - startdates)
      .toISOString()
      .slice(0, -14);

    var enddates = dateout.date.getTimezoneOffset() * 60000; //offset in milliseconds
    var checkout = new Date(dateout.date - enddates)
      .toISOString()
      .slice(0, -14);
    const formdata = {
      hotelid: hotelid,
      category: category,
      checkin: checkin,
      checkout: checkout,
      type: "room",
    };
    dispatch(getHotelList(formdata)).then((res) => {
      if (res) {
        setDetail(res.data[0]);
        setavail(true);
      } else {
        setavail(false);
      }
    });
  };

  console.log("date", datein.date);
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
            <form>
              <label className="text-lg leading-6 font-medium text-gray-900">
                Checkin date
              </label>
              <div className="relative">
                <DatePicker
                  className="appearance-none block w-half bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4"
                  clearIcon={null}
                  format="yyyy-MM-dd"
                  value={datein.date}
                  onChange={(newdate) => onDateChange(newdate)}
                  minDate={new Date()}
                />
              </div>

              <label className="text-lg leading-6 font-medium text-gray-900">
                Checkout date
              </label>
              <div className="relative">
                <DatePicker
                  className="appearance-none block w-half bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4"
                  clearIcon={null}
                  format="yyyy-MM-dd"
                  value={dateout.date}
                  onChange={(newdateout) => onDateChange1(newdateout)}
                  minDate={new Date()}
                />
              </div>
            </form>
            <div className="mt-8">
              <button
                onClick={onDateApply}
                className="bg-gray-900 text-gray-100 px-5 py-3 font-semibold rounded"
              >
                Apply
              </button>
              <button
                onClick={confirm}
                disabled={!avail}
                className="bg-gray-900 text-gray-100 px-8 py-3 font-semibold rounded float-right"
              >
                {avail ? <div>Book Now</div> : <div>Not Available</div>}
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
            {/* <div className="sm:col-span-2">
              <dt className="text-sm leading-5 font-medium text-gray-500">
                Address
              </dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900">
                {hdetail.address}
              </dd>
            </div> */}
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
