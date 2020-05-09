import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelList } from "../../Redux/actions";
import { navigate, useQueryParams, usePath } from "hookrouter";
import * as Notficiation from "../../util/Notifications";
import DatePicker from "react-date-picker";
import BookingConfirmation from "./BookingConfirmation";
import { DEFAULT_IMAGE } from "../../Common/constants";
import Carousal from "../common/Carousal";
import {
    getAppliedFilters,
    setAppliedFilters,
    stringFromDate,
    getRoomDetails,
    setRoomDetails,
} from "../../util/helperFunctions";
import { FullLoading } from "../common/Loader";

export default function ViewRoom({ category, id }) {
    const hotelid = id;
    const dispatch = useDispatch();
    const state = useSelector((reduxState) => reduxState);
    const { currentUser } = state;
    const appliedFilters = getAppliedFilters(null, true);
    const [datein, setdatein] = useState(new Date(appliedFilters.checkin));
    const [dateout, setdateout] = useState(new Date(appliedFilters.checkout));
    const [avail, setavail] = useState(true);
    const [applied, setApplied] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const controlCarousal = useState(false);
    const [queryParams, setQueryParams] = useQueryParams();
    const currentURI = usePath();
    const roomDetails = getRoomDetails();
    const [detail, setDetail] = useState({ ...roomDetails, isFetching: true });
    const dateDifferences = Math.ceil(
        (dateout - datein) / (1000 * 60 * 60 * 24) + 1
    );
    const [dateDifference, setdateDifference] = useState(dateDifferences);
    var minmumDays = process.env.REACT_APP_MIN_DAYS;
    useEffect(() => {
        window.scrollTo(0, 0);
        updateRoomGetDetail();
    }, []);

    const updateRoomGetDetail = () => {
        setDetail({ ...detail, isFetching: true });
        const form = getUpdatedDetails();
        if (form) {
            dispatch(getHotelList(form)).then((res) => {
                let newDetail = { ...detail };
                delete newDetail.isFetching;
                delete newDetail.count;
                let listDetail = [];
                setApplied(true);
                if (res && res.data) {
                    if (!roomDetails && res.data[0]) {
                        newDetail = res.data[0];
                        setRoomDetails(newDetail);
                    }

                    listDetail = res.data.filter(
                        (el) =>
                            JSON.stringify({ ...el, id: "" }) ===
                            JSON.stringify({ ...newDetail, id: "" })
                    );

                    if (listDetail.length < 1 && res.data.length > 0) {
                        listDetail = res.data.filter(
                            (el) =>
                                JSON.stringify({ ...el, id: "" }) ===
                                JSON.stringify({ ...res.data[0], id: "" })
                        );
                    }

                    if (listDetail.length > 0) {
                        newDetail =
                            listDetail[
                                Math.floor(Math.random() * listDetail.length)
                            ];
                        setRoomDetails(newDetail);
                        setavail(true);
                        setdateDifference(dateDifferences);
                    } else {
                        newDetail = {};
                        setavail(false);
                        setdateDifference(1);
                    }
                } else {
                    setavail(false);
                    setdateDifference(1);
                }
                setDetail({
                    ...newDetail,
                    count: listDetail.length,
                    isFetching: false,
                });
            });
        }
    };
    const onDateChangeIn = (newdatein) => {
        setdatein(newdatein);
        if (
            new Date(dateout) <
            +new Date(newdatein) + (minmumDays - 1) * 60 * 60 * 24 * 1000
        ) {
            setdateout(
                new Date(
                    +new Date(newdatein) +
                        (minmumDays - 1) * 60 * 60 * 24 * 1000
                )
            );
        }
        setApplied(false);
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
            //logged in

            setShowConfirmation(true);
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
        // if (!Date.parse(datein) || !Date.parse(dateout)) {
        //     navigate("/browse");
        //     return false;
        // }
        const formdata = {
            hotelid,
            category,
            checkin: stringFromDate(datein),
            checkout: stringFromDate(dateout),
            type: "room",
        };
        setAppliedFilters({
            ...appliedFilters,
            checkin: formdata.checkin,
            checkout: formdata.checkout,
        });
        return formdata;
    }

    function toggleConfirmation() {
        setShowConfirmation(!showConfirmation);
    }

    if (detail.isFetching) {
        return <FullLoading />;
    }

    const previewImage =
        (detail.photos && detail.photos[0]) || DEFAULT_IMAGE.ROOM;

    return (
        <div className="py-10 h-full">
            <div className="max-w-5xl mx-auto bg-white shadow overflow-hidden  sm:rounded-lg">
                <div className="bg-white lg:mx-8 lg:my-4 lg:flex lg:max-w-5xl">
                    <div className="lg:w-1/2">
                        <img
                            onClick={() =>
                                detail.photos && detail.photos.length >= 1
                                    ? controlCarousal[1](true)
                                    : null
                            }
                            className={`h-64 bg-cover lg:rounded-lg ${
                                detail.photos && detail.photos.length >= 1
                                    ? "cursor-pointer"
                                    : ""
                            }`}
                            src={previewImage}
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
                                    maxDate={
                                        new Date(
                                            +new Date() +
                                                2 * 360 * 60 * 60 * 24 * 1000
                                        )
                                    }
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
                                    minDate={
                                        new Date(
                                            +new Date(datein) +
                                                (minmumDays - 1) *
                                                    60 *
                                                    60 *
                                                    24 *
                                                    1000
                                        )
                                    }
                                    maxDate={
                                        new Date(
                                            +new Date() +
                                                2 * 360 * 60 * 60 * 24 * 1000
                                        )
                                    }
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
                            <dd className="mt-1 text-sm leading-5 text-gray-900 capitalize">
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
                                Rent /Day
                            </dt>
                            <dd className="mt-1 text-sm leading-5 text-gray-900">
                                Rs. {detail.cost}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-base leading-5 font-medium text-gray-800">
                                Total Price
                            </dt>
                            <dd className="mt-1 text-base leading-5 text-gray-900 font-semibold">
                                Rs. {detail.cost * dateDifference}
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
                                            <div className="ml-2 flex flex-wrap uppercase">
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
                                            <div className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24">
                                                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <Carousal
                control={controlCarousal}
                images={detail.photos}
                title={detail.title}
            />
            {
                <BookingConfirmation
                    shown={showConfirmation}
                    toggle={toggleConfirmation}
                    data={{
                        ...detail,
                        startdate: datein,
                        enddate: dateout,
                        hId: hotelid,
                    }}
                />
            }
        </div>
    );
}
