import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { navigate } from "hookrouter";
import GuestDetails from "./GuestDetails";
import { BOOKING_CHECKIN_STATUS, BOOKING_STATUS } from "../../Common/constants";
import * as Notification from "../../util/Notifications";
import {
    deleteBooking,
    setCheckinStatus,
    getHotelBookingList,
} from "../../Redux/actions";

export default function UpdateBooking({
    toggle,
    data,
    shown,
    id,
    user_details,
}) {
    const [roomError, setRoomError] = useState(false);
    const [roomNumber, setRoomNumber] = useState(data.roomNumber);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setRoomNumber(data.roomNumber);
    }, [data.roomNumber]);

    function updateRoomno(status) {
        setRoomError(false);    
        if (roomNumber && !loading) {
            let body = {
                status,
            };
            if (status === BOOKING_CHECKIN_STATUS.CHECKEDIN.type) {
                body.roomNumber = roomNumber;
            }
            setError(false);
            setLoading(true);
            dispatch(setCheckinStatus(data.book_id, body)).then((res) => {
                if (res.status === 200) {
                    Notification.Success({
                        msg: `${BOOKING_CHECKIN_STATUS[status].string} #${data.book_id}`,
                    });
                    dispatch(getHotelBookingList(id));
                    toggle(data.book_id);
                } else {
                    setError(true);
                    setLoading(false);
                }
            });
            console.log("update room no to", roomNumber);
        } else {
            setRoomError(true);
        }
    }

    function del() {
        navigate("");
        if (confirmDelete && !loading) {
            setLoading(true);
            dispatch(deleteBooking(data.book_id)).then((res) => {
                if (res.status === 200) {
                    Notification.Success({
                        msg: `Deleted booking #${data.book_id}`,
                    });

                    dispatch(getHotelBookingList(id));
                    toggle(data.book_id);
                } else {
                    setError(true);
                    setLoading(false);
                }
            });
        } else if (!loading) {
            setConfirmDelete(true);
        }
    }

    function back() {
        if (!loading) {
            setConfirmDelete(false);
            toggle(data.book_id);
        }
    }

    console.log();

    return (
        <div
            className={`${
                shown ? "flex" : "hidden"
            }   w-full w-3/4 justify-center top-0 left-0 fixed h-screen bg-gray-200 overflow-y-auto`}>
            <div className="pb-8 px-0 w-full mx-5 rounded">
                <div className="uppercase bg-indigo-600 pt-3 m-0 m-auto mt-5 md:w-1/2 px-5 pb-2 text-lg text-white font-bold tracking-wide rounded-t">
                    Booking ID: {data.book_id}
                </div>
                <div className="px-5 bg-white shadow-lg rounded md:w-1/2 m-0 m-auto pb-3">
                    <div className="pb-8 pt-3 px-0 text-gray-800">
                        <div className="flex flex-wrap justify-center">
                            <div className="flex col pb-8 pt-2 mx-5 flex-grow items-center justify-center">
                                <div className="pb-8">
                                    <label
                                        className="block font-bold text-xl"
                                        htmlFor="roomNumber">
                                        Room No
                                    </label>
                                    <div className="w-40 h-8">
                                        <input
                                            disabled={!(data.statusCheckin === BOOKING_CHECKIN_STATUS.PENDING.type && data.statusBooking === BOOKING_STATUS.BOOKED.type)}
                                            className={`bg-gray-200 text-center appearance-none border-2 border-gray-400 ${
                                                roomError
                                                    ? "border-red-700"
                                                    : ""
                                            } rounded w-full py-2 px-4 text-5xl font-bold text-gray-800 leading-tight focus:outline-none focus:border-indigo-600`}
                                            type="text"
                                            name="roomNumber"
                                            onChange={(e) =>
                                                setRoomNumber(e.target.value)
                                            }
                                            value={roomNumber}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col px-5 md:px-12 text-sm md:text-base">
                                <div className="flex justify-center mb-4">
                                    {data.statusBooking ===
                                    BOOKING_STATUS.CANCELLED.type ? (
                                        <div
                                            className={`text-lg font-bold uppercase px-2 py-1 text-white bg-${
                                                BOOKING_STATUS[
                                                    data.statusBooking
                                                ].color
                                            }`}>
                                            {
                                                BOOKING_STATUS[
                                                    data.statusBooking
                                                ].string
                                            }
                                        </div>
                                    ) : (
                                        <div
                                            className={`text-lg font-bold uppercase px-2 py-1 text-white bg-${
                                                BOOKING_CHECKIN_STATUS[
                                                    data.statusCheckin
                                                ].color
                                            }`}>
                                            {
                                                BOOKING_CHECKIN_STATUS[
                                                    data.statusCheckin
                                                ].string
                                            }
                                        </div>
                                    )}
                                </div>
                                <div className="flex">
                                    <div className="font-bold w-24">Name</div>
                                    <div className="">{data.user.name}</div>
                                </div>
                                <div className="flex">
                                    <div className="font-bold w-24">Email</div>
                                    <div className="">{data.user.email}</div>
                                </div>
                                <div className="flex">
                                    <div className="font-bold w-24">
                                        Room
                                    </div>
                                    <div className="">{data.room.title} ({data.room.category})</div>
                                </div>

                                <div className="flex">
                                    <div className="font-bold w-24">Cost</div>
                                    <div className="">{data.room.cost}</div>
                                </div>
                                <div className="flex">
                                    <div className="font-bold w-24">
                                        Check In
                                    </div>
                                    <div className="">{data.checkinString}</div>
                                </div>
                                <div className="flex">
                                    <div className="font-bold w-24">
                                        Checkout
                                    </div>
                                    <div className="">
                                        {data.checkoutString}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="font-bold w-24">Booked</div>
                                    <div className="">
                                        {data.createdAtString}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {error && (
                        <div className="text-sm text-red-700 text-center mb-5 font-medium">
                            Something went wrong please. Try again.
                        </div>
                    )}
                    <div className="flex justify-between font-bold tracking-wide">
                        <div className="flex" onClick={back}>
                            <div
                                className={`flex items-center justify-center p-2 px-3 md:px-6 rounded ${
                                    loading
                                        ? "bg-gray-600"
                                        : "bg-gray-300  hover:bg-gray-400"
                                } cursor-pointer`}>
                                Back
                            </div>
                        </div>
                        {data.statusBooking ===
                        BOOKING_STATUS.CANCELLED.type ? (
                            <div className="flex text-white"></div>
                        ) : (
                            <div className="flex text-white">
                                {data.statusCheckin ===
                                    BOOKING_CHECKIN_STATUS.PENDING.type && (
                                    <div className="flex">
                                        <div
                                            onClick={del}
                                            className={`flex items-center justify-center p-2 px-3 md:px-6 rounded mr-2 ${
                                                loading
                                                    ? "bg-gray-600"
                                                    : "bg-red-700 hover:bg-red-800"
                                            } cursor-pointer`}>
                                            {confirmDelete
                                                ? "Sure ?"
                                                : "Delete"}
                                        </div>
                                        <div
                                            onClick={() =>
                                                updateRoomno(
                                                    BOOKING_CHECKIN_STATUS
                                                        .CHECKEDIN.type
                                                )
                                            }
                                            className={`flex items-center justify-center p-2 px-3 md:px-6 rounded mr-2 ${
                                                loading
                                                    ? "bg-gray-600"
                                                    : "bg-indigo-600 hover:bg-indigo-800"
                                            } cursor-pointer`}>
                                            Check In
                                        </div>
                                    </div>
                                )}
                                {data.statusCheckin ===
                                    BOOKING_CHECKIN_STATUS.CHECKEDIN.type && (
                                    <div className="flex">
                                        <div
                                            onClick={() =>
                                                updateRoomno(
                                                    BOOKING_CHECKIN_STATUS
                                                        .PENDING.type
                                                )
                                            }
                                            className={`flex items-center justify-center p-2 px-3 md:px-6 rounded mr-2 ${
                                                loading
                                                    ? "bg-gray-600"
                                                    : "bg-red-700 hover:bg-red-800"
                                            } cursor-pointer`}>
                                            Undo
                                        </div>
                                        <div
                                            onClick={() =>
                                                updateRoomno(
                                                    BOOKING_CHECKIN_STATUS
                                                        .CHECKEDOUT.type
                                                )
                                            }
                                            className={`flex items-center justify-center p-2 px-3 md:px-6 rounded mr-2 ${
                                                loading
                                                    ? "bg-gray-600"
                                                    : "bg-indigo-600 hover:bg-indigo-800"
                                            } cursor-pointer`}>
                                            Check Out
                                        </div>
                                    </div>
                                )}
                                {data.statusCheckin ===
                                    BOOKING_CHECKIN_STATUS.CHECKEDOUT.type && (
                                    <div className="flex">
                                        <div
                                            onClick={() =>
                                                updateRoomno(
                                                    BOOKING_CHECKIN_STATUS
                                                        .CHECKEDIN.type
                                                )
                                            }
                                            className={`flex items-center justify-center p-2 px-3 md:px-6 rounded mr-2 ${
                                                loading
                                                    ? "bg-gray-600"
                                                    : "bg-red-700 hover:bg-red-800"
                                            } cursor-pointer`}>
                                            Undo
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <GuestDetails user_details={user_details} id={data.book_id} />
            </div>
        </div>
    );
}
