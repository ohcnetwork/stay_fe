import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelList, dopostBook } from "../../Redux/actions";
import { navigate, useQueryParams, usePath } from "hookrouter";
import * as Notficiation from "../../util/Notifications";
import DatePicker from "react-date-picker";
import BookingConfirmation from "./BookingConfirmation";
import { DEFAULT_IMAGE } from "../../Common/constants";

export default function ViewRoom({ category, id, startdate, enddate }) {
    const hotelid = id;

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { currentUser } = state;

    const [datein, setdatein] = useState(new Date(startdate));
    const [dateout, setdateout] = useState(new Date(enddate));
    const [avail, setavail] = useState(true);
    const [detail, setDetail] = useState({ isFetching: true });
    const [applied, setApplied] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [queryParams, setQueryParams] = useQueryParams();
    const currentURI = usePath();
    const body = JSON.parse(localStorage.getItem("roomdetails"));
    console.log("body", body);
    useEffect(() => {
        // console.log(localStorage.getItem('room_desc'));
        updateRoomGetDetail();
    }, []);

    const updateRoomGetDetail = () => {
        setDetail({ ...detail, isFetching: true });
        const form = getUpdatedDetails();
        if (form) {
            dispatch(getHotelList(form)).then((res) => {
                let newDetail = detail;
                setApplied(true);
                if (res && res.data) {
                    console.log("res", res.data);
                    console.log("body1", JSON.stringify({ ...body, id: "" }));
                    console.log(
                        "body1",
                        JSON.stringify({ ...res.data[0], id: "" })
                    );
                    newDetail = res.data.find(
                        (el) =>
                            JSON.stringify({ ...el, id: "" }) ===
                            JSON.stringify({ ...body, id: "" })
                    );
                    console.log("new", newDetail);
                    if (newDetail == null) {
                        setavail(false);
                    } else {
                        setavail(true);
                    }
                } else {
                    setavail(false);
                }
                setDetail({ ...newDetail, isFetching: false });
            });
        }
    };

    const onDateChangeIn = (newdatein) => {
        if (checkValidDate(newdatein, dateout)) {
            setdatein(newdatein);
            setApplied(false);
        }
    };
    const onDateChangeOut = (newdateout) => {
        if (checkValidDate(datein, newdateout)) {
            setdateout(newdateout);
            setApplied(false);
        }
    };

    const checkValidDate = (a, b) => {
        if (a.getTime() > b.getTime()) {
            Notficiation.Error({
                msg: "Sorry, Your checkout date is far behind checkin date!",
            });
            return false;
        }
        return true;
    };

    // on apply
    const onDateApply = () => {
        !applied && updateRoomGetDetail();
    };

    // booking button handle
    const confirm = () => {
        if (!avail || !applied) return;

        if (currentUser && currentUser.data) {
            console.log(avail && applied);
            //logged in
            const formData = getUpdatedDetails();
            const body = {
                roomid: detail.id,
                checkin: formData.checkin,
                checkout: formData.checkout,
            };

            // setShowConfirmation(true);
            dispatch(dopostBook(body)).then((resp) => {
                const { data: res } = resp;
                const { status: statusCode } = resp;
                if (res && statusCode === 201) {
                    Notficiation.Success({
                        msg: "Booking Successfull",
                    });
                    navigate("/history");
                } else {
                    Notficiation.Error({
                        msg:
                            "Sorry! some error encountered... Please reload the page to continue.",
                    });
                }
            });
        } else {
            //not logged in
            Notficiation.Error({
                msg: "Please login to confirm your booking",
            });

            setQueryParams({ redirect: currentURI });
            navigate(`/login?${queryParams}`);
            //not logged in
        }
    };

    function getUpdatedDetails() {
        if (!Date.parse(startdate) || !Date.parse(enddate)) {
            navigate("/browse");
            return false;
        }
        var startdates = datein.getTimezoneOffset() * 60000; //offset in milliseconds
        var checkin = new Date(datein - startdates).toISOString().slice(0, -14);

        var enddates = dateout.getTimezoneOffset() * 60000; //offset in milliseconds
        var checkout = new Date(dateout - enddates).toISOString().slice(0, -14);
        const formdata = {
            hotelid,
            category,
            checkin,
            checkout,
            type: "room",
        };

        return formdata;
    }

    function toggleConfirmation() {
        setShowConfirmation(!showConfirmation);
    }

    if (detail.isFetching) {
        return (
            <div className="lds-dual-ring h-screen w-screen items-center justify-center overflow-hidden flex"></div>
        );
    }

    return (
        <div className="py-10 bg-gray-300 h-full">
            <div className="max-w-5xl mx-auto bg-white shadow overflow-hidden  sm:rounded-lg">
                <div className="bg-white lg:mx-8 lg:my-4 lg:flex lg:max-w-5xl">
                    <div className="lg:w-1/2">
                        <img
                            className="h-64 bg-cover lg:rounded-lg"
                            src={DEFAULT_IMAGE.ROOM}
                            alt={detail.title}
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
                                    name="datein"
                                    value={datein}
                                    onChange={onDateChangeIn}
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
                                    name="dateout"
                                    value={dateout}
                                    onChange={onDateChangeOut}
                                    minDate={new Date()}
                                />
                            </div>
                        </form>
                        <div className="mt-8">
                            <button
                                onClick={onDateApply}
                                className={`${
                                    applied
                                        ? "bg-gray-500 cursor-default"
                                        : "bg-gray-900"
                                } text-gray-100 px-5 py-3 font-semibold rounded`}>
                                Apply
                            </button>
                            <button
                                onClick={confirm}
                                disabled={!avail}
                                className={`text-gray-100 cursor-default ${
                                    !avail
                                        ? "text-red-700"
                                        : applied
                                        ? "bg-gray-900 cursor-pointer"
                                        : "bg-gray-500"
                                } px-8 py-3 font-semibold rounded float-right`}>
                                {avail ? (
                                    <div>Book Now</div>
                                ) : (
                                    <div>Not Available</div>
                                )}
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
                                            <div className="ml-2 flex flex-wrap">
                                                {detail.features &&
                                                    detail.features
                                                        .split(",")
                                                        .map((el) => (
                                                            <div
                                                                className="m-2 px-2 bg-gray-400 rounded"
                                                                key={el}>
                                                                {el.replace(
                                                                    "_",
                                                                    " "
                                                                )}
                                                            </div>
                                                        ))}
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a
                                                href="#"
                                                className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24">
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
            {
                <BookingConfirmation
                    shown={showConfirmation}
                    toggle={toggleConfirmation}
                    data={{ ...detail, startdate, enddate }}
                />
            }
        </div>
    );
}
