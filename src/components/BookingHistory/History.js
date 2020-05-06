import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Notficiation from "../../util/Notifications";
import CancelConfirm from "./CancelConfirmation";
import { getBookingHistory, deleteBooking } from "../../Redux/actions";
import { DEFAULT_IMAGE } from "../../Common/constants";
import { Loading } from "../common/Loader";

export default function History() {
    var item = [];
    const state = useSelector((reduxState) => reduxState);
    const { currentUser } = state;
    const user = currentUser.data.data;
    const dispatch = useDispatch();
    const [Shown, toggleShown] = useState(true);
    const [Sure, toggleSure] = useState(false);
    const [Historydata, setHistorydata] = useState({});
    const [PageRerender, setPageRerender] = useState({});
    const [Bookingstate, setBookingstate] = useState("BOOKED");
    const [deletetarget, setdeletetarget] = useState({});
    const [loading, setloading] = useState(false);
    var i = 0;

    const Cancel = (e) => {
        setdeletetarget(e.target);
        toggleShown(!Shown);
    };

    if (Sure === true) {
        setloading(true);
        toggleSure(!Sure);
        dispatch(deleteBooking(deletetarget.name)).then((resp) => {
            const { status: statusCode } = resp;
            if (statusCode === 200) {
                setPageRerender(Math.random() * 10 + Math.random());
                Notficiation.Success({
                    msg: "Booking Cancelled",
                });
            }
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getBookingHistory()).then((resp) => {
            const { data: res } = resp;
            setHistorydata(res);
            setloading(false);
        });
    }, [dispatch, user, PageRerender]);
    var count = 0;
    if (Historydata !== undefined) {
        count = Historydata.length;
        for (i = 0; i < count; i++) {
            item = item.concat(Historydata[i]);
        }
    }

    var temp = [];
    var j = 0;
    for (i = 0; i < count; i++) {
        for (j = i + 1; j < count; j++) {
            if (item[i].createdAt < item[j].createdAt) {
                temp = item[i];
                item[i] = item[j];
                item[j] = temp;
            }
        }
    }
    function toggle() {
        toggleShown(!Shown);
    }
    function CancelSured() {
        toggleSure(!Sure);
    }
    if (count === 0) {
        return (
            <div className="py-10 ">
                <div className="text-center">
                    <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                        Booking History
                    </h2>
                </div>
                <div className="w-3/4 lg:w-2/6 bg-gray-100 p-10  my-8 mx-auto  text-center rounded overflow-hidden shadow-lg">
                    <h3 className=" m-0 text-md m-auto">
                        No Booking History !
                    </h3>
                </div>
            </div>
        );
    } else
        return (
            <div>
                <div className={` ${Shown ? "" : "hidden"}  py-10`}>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="max-w-5xl  mx-auto   overflow-hidden  sm:rounded-lg">
                            <div className="text-center">
                                <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                                    Booking History
                                </h2>
                                <div className="flex mt-3 text-center lg:text-md text-sm w-5/6 flex-row bg-gray-100 shadow lg:w-1/2 m-0 m-auto ">
                                    <div className="text-center w-1/3  px-3 py-2 m-1">
                                        <button
                                            className={`bg-white text-xs ml-0 w-full hover:bg-blue-500 font-semibold mt-1  hover:text-white py-1 px-2 border ${
                                                Bookingstate === "CHECKED"
                                                    ? "bg-blue-500 text-white"
                                                    : "text-blue-500"
                                            }
                                     border-blue-500 hover:border-transparent rounded`}
                                            onClick={() =>
                                                setBookingstate("CHECKED")
                                            }>
                                            CHECKED
                                        </button>
                                    </div>
                                    <div className=" text-center w-1/3  px-1 py-2 m-1">
                                        <button
                                            className={`bg-white w-full text-xs ml-0 hover:bg-blue-500 font-semibold mt-1  hover:text-white py-1 px-2 border ${
                                                Bookingstate === "BOOKED"
                                                    ? "bg-blue-500 text-white"
                                                    : "text-blue-500"
                                            } border-blue-500 hover:border-transparent rounded`}
                                            onClick={() =>
                                                setBookingstate("BOOKED")
                                            }>
                                            BOOKED
                                        </button>
                                    </div>
                                    <div className=" text-center w-1/3 px-3 py-2 m-1">
                                        <button
                                            className={`bg-white w-full text-xs ml-0 hover:bg-blue-500 font-semibold mt-1  hover:text-white py-1 px-0 lg:px-2 border ${
                                                Bookingstate === "CANCELLED"
                                                    ? "bg-blue-500 text-white"
                                                    : "text-blue-500"
                                            } border-blue-500 hover:border-transparent rounded`}
                                            onClick={() =>
                                                setBookingstate("CANCELLED")
                                            }>
                                            CANCELLED
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="relative  content-center lg:grid-cols-2 grid  m-8 lg:mx-8 lg:my-4 lg:max-w-5xl">
                                {item.map((value, index) => {
                                    if (
                                        (value.statusBooking === Bookingstate &&
                                            value.statusCheckin ===
                                                "PENDING") ||
                                        (Bookingstate === "CHECKED" &&
                                            (value.statusCheckin ===
                                                "CHECKEDIN" ||
                                                value.statusCheckin ===
                                                    "CHECKEDOUT"))
                                    )
                                        return (
                                            <div
                                                id={index}
                                                key={index}
                                                className="sm:w-full md:w-3/4 lg:w-5/6 bg-gray-100 mx-auto my-8  rounded overflow-hidden shadow-lg">
                                                <img
                                                    className="w-full  h-30"
                                                    src={
                                                        (value.photos &&
                                                            value.photos[0]) ||
                                                        DEFAULT_IMAGE.HOTEL
                                                    }
                                                    alt={value.name}
                                                />
                                                <div className="px-3 py-4">
                                                    <div className="font-bold flex text-xl mb-2">
                                                        <div className="w-1/2">
                                                            {
                                                                value.room
                                                                    .facility
                                                                    .name
                                                            }
                                                        </div>
                                                        <div className="m-0 m-auto">
                                                            {value.statusBooking ===
                                                                "BOOKED" &&
                                                                value.statusCheckin ===
                                                                    "PENDING" && (
                                                                    <button
                                                                        onClick={
                                                                            Cancel
                                                                        }
                                                                        value={
                                                                            value.statusBooking
                                                                        }
                                                                        name={
                                                                            value.book_id
                                                                        }
                                                                        className="bg-white hover:bg-blue-500 text-blue-700 font-semibold mt-1  hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                                                                        Cancel
                                                                    </button>
                                                                )}
                                                        </div>
                                                    </div>
                                                    <ul className="text-gray-700 text-base">
                                                        <li>
                                                            Room Type :{" "}
                                                            {
                                                                value.room
                                                                    .category
                                                            }
                                                        </li>
                                                        <li>
                                                            Booking Date :{" "}
                                                            {new Date(
                                                                value.createdAt
                                                            ).toLocaleString()}
                                                        </li>
                                                        <li>
                                                            Checkin :{" "}
                                                            {new Date(
                                                                value.checkin
                                                            ).toLocaleDateString()}
                                                        </li>
                                                        <li>
                                                            Checkout :{" "}
                                                            {new Date(
                                                                value.checkout
                                                            ).toLocaleDateString()}
                                                        </li>
                                                        <li>
                                                            <div className="flex w-full  text-sm flex-row  ">
                                                                <div className=" w-1/2  ">
                                                                    Booking
                                                                    status :{" "}
                                                                    {
                                                                        value.statusBooking
                                                                    }
                                                                </div>
                                                                <div className="w-1/2 ">
                                                                    Checkin
                                                                    status :{" "}
                                                                    {
                                                                        value.statusCheckin
                                                                    }
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            Cost : Rs{" "}
                                                            {value.room.cost}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                {!Shown && (
                    <CancelConfirm
                        Shown={Shown}
                        Sure={Sure}
                        toggle={toggle}
                        CancelSured={CancelSured}
                    />
                )}
            </div>
        );
}
