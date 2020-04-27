import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { A } from "hookrouter";

import { BOOKING_CHECKIN_STATUS, BOOKING_STATUS } from "../../Common/constants";
import { getHotelBookingList } from "../../Redux/actions";
import UpdateBooking from "./UpdateBooking";

export default function ViewBooking({ id }) {
    const state = useSelector((state) => state);
    const { hotelBookingList } = state;
    const dispatch = useDispatch();
    const [showUpdation, setShowUpdation] = useState({
        shown: false,
        data: "",
    });
    const [details, setdetails] = useState({});
    const availableFilters = {
        STATUS_CHECKIN: (el, status) =>
            el.filter((e) => e.statusCheckin === status),
        SHOW_DELETED: (el, status) =>
            el.filter((e) =>
                status ? true : e.statusBooking === BOOKING_STATUS.BOOKED.type
            ),
        SORT_CHECKIN_ASCENDING: (el, status) =>
            status
                ? el.sort((a, b) => new Date(a.checkin) - new Date(b.checkin))
                : el.sort((a, b) => new Date(b.checkin) - new Date(a.checkin)),
        SHOW_UPCOMING: (el, status) =>
            status
                ? el.filter(
                      (e) =>
                          new Date(e.checkin) >=
                          new Date() - 1000 * 60 * 60 * 24
                  )
                : el.filter(
                      (e) =>
                          new Date(e.checkin) < new Date() - 1000 * 60 * 60 * 24
                  ),
    };
    const [filters, setFilters] = useState({
        STATUS_CHECKIN: BOOKING_CHECKIN_STATUS.PENDING.type,
        SHOW_DELETED: false,
        SHOW_UPCOMING: true,
        SORT_CHECKIN_ASCENDING: true,
    });

    const months = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
    ];

    useEffect(() => {
        dispatch(getHotelBookingList(id)).then((resp) => {
            const { data: res } = resp;
            setdetails(res);
        });
    }, [dispatch, id]);

    function setFilter(type, value) {
        setFilters({ ...filters, [type]: value });
    }

    function toggle(id) {
        setShowUpdation({
            shown: !showUpdation.shown,
            data: bookings.find((b) => b.book_id === id),
        });
    }

    function dateString(date, extended = false) {
        const tme = new Date(date);
        const mnt = months[tme.getMonth()].toUpperCase();
        const dat = tme.getDate();
        const year = tme.getFullYear();
        let hours = tme.getHours();
        hours = (hours < 10 ? "0" : "") + hours;
        let minutes = tme.getMinutes();
        minutes = (minutes < 10 ? "0" : "") + minutes;
        return (
            <div className="">
                {dat} {mnt} {year}
                {extended && (
                    <span>
                        {" "}
                        {hours}:{minutes}
                    </span>
                )}
            </div>
        );
    }
    function showBookingList(bookings) {
        let msg = "This hotel has no bookings";
        if (bookings.length > 0) {
            const filteredBookings = Object.keys(filters).reduce(
                (prev, fil, i) => {
                    return availableFilters[fil](prev, filters[fil]);
                },
                bookings
            );
            if (filteredBookings.length > 0) {
                return filteredBookings.map((booking) => (
                    <div
                        key={booking.book_id.toString()}
                        className={`flex pt-5 pb-5 border-b pl-3 pr-3 ${
                            booking.statusBooking ===
                            BOOKING_STATUS.CANCELLED.type
                                ? "bg-gray-300"
                                : "bg-white hover:bg-gray-200"
                        } cursor-pointer`}
                        onClick={() => {
                            toggle(booking.book_id);
                        }}>
                        <div className="w-1/12 text-gray-700 text-sm md:text-base">
                            {booking.book_id}
                        </div>
                        <div className="w-4/12 md:w-3/12 text-gray-700 text-sm md:text-base">
                            <div>{booking.user.name}</div>
                            <div className="text-gray-600 md:text-sm text-xs truncate">
                                {booking.user.email}
                            </div>
                        </div>
                        <div className="w-2/12 text-gray-700 text-sm md:text-base uppercase md:block hidden">
                            {booking.room.category}
                        </div>
                        <div className="w-3/12 text-gray-700 text-sm md:text-base">
                            {booking.checkinString}
                        </div>
                        {booking.statusBooking ===
                        BOOKING_STATUS.CANCELLED.type ? (
                            <div className="w-4/12 md:w-3/12 text-gray-900 text-sm md:text-base flex items-center text-xs">
                                <div
                                    className={`font-bold uppercase px-1 text-white bg-${
                                        BOOKING_STATUS[booking.statusBooking]
                                            .color
                                    }`}>
                                    {
                                        BOOKING_STATUS[booking.statusBooking]
                                            .string
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="w-4/12 md:w-3/12 text-gray-900 text-sm md:text-base flex items-center text-xs">
                                <div
                                    className={`font-bold uppercase px-1 text-white bg-${
                                        BOOKING_CHECKIN_STATUS[
                                            booking.statusCheckin
                                        ].color
                                    }`}>
                                    {
                                        BOOKING_CHECKIN_STATUS[
                                            booking.statusCheckin
                                        ].string
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                ));
            } else {
                msg = "Nothing matches filters";
            }
        }
        return (
            <div className="text-gray-500 py-8 text-center text-xl w-full">
                {msg}
            </div>
        );
    }

    if (!hotelBookingList || hotelBookingList.isFetching) {
        return (
            <div className="lds-dual-ring h-screen w-screen items-center justify-center overflow-hidden flex"></div>
        );
    }

    // check if hotel exists
    if (hotelBookingList.error) {
        let msg = hotelBookingList.error
            ? "Some problem occurred"
            : "Hotel was not found";
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden">
                <div className="text-5xl text-gray-400">{msg}</div>
                <A
                    href="/"
                    className="flex items-center text-xl m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                    Home
                </A>
            </div>
        );
    }

    let bookings =
        (hotelBookingList.data && hotelBookingList.data.filter((e) => e)) || [];
    bookings.forEach((b, i) => {
        bookings[i].checkinString = dateString(b.checkin);
        bookings[i].checkoutString = dateString(b.checkout);
        bookings[i].createdAtString = dateString(b.createdAt, true);
        bookings[i].roomno = "";
    });

    return (
        <div className="font-sans bg-gray-lighter flex flex-col w-full min-h-screen overflow-x-hidden">
            <div
                className={`flex-col ${
                    showUpdation.shown ? "hidden" : "flex"
                } flex-grow container mx-auto sm:px-4 pt-6 pb-8`}>
                <div className="bg-white border-t border-b sm:rounded shadow mb-6 mx-0 mx-2">
                    <div className="pt-5 border-b bg-gray-100">
                        <div className="flex items-center text-gray-800">
                            <h2 className="flex px-5 md:pl-10 flex-wrap items-center md:text-4xl text-2xl uppercase">
                                Booking Details
                            </h2>
                            <div className="text-gray-600">
                                Total {bookings.length} bookings
                            </div>
                        </div>
                        <div className="flex items-center justify-between flex-wrap">
                            <div className="flex py-2 px-2">
                                <div
                                    className={`text-xs md:text-sm py-1 border border-gray-400 mx-1 cursor-pointer px-2 rounded-full ${
                                        filters.SHOW_UPCOMING
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-100"
                                    }`}
                                    onClick={() =>
                                        setFilter(
                                            "SHOW_UPCOMING",
                                            !filters.SHOW_UPCOMING
                                        )
                                    }>
                                    Upcoming
                                </div>
                                <div
                                    className={`text-xs md:text-sm py-1 border border-gray-400 mx-1 cursor-pointer px-2 rounded-full ${
                                        !filters.SHOW_UPCOMING
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-100"
                                    }`}
                                    onClick={() =>
                                        setFilter(
                                            "SHOW_UPCOMING",
                                            !filters.SHOW_UPCOMING
                                        )
                                    }>
                                    Previous
                                </div>
                            </div>
                            <div className="flex py-2 px-2">
                                <div
                                    className={`text-xs md:text-sm py-1 border border-gray-400 mx-1 cursor-pointer px-2 rounded-full ${
                                        filters.SORT_CHECKIN_ASCENDING
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-100"
                                    }`}
                                    onClick={() =>
                                        setFilter(
                                            "SORT_CHECKIN_ASCENDING",
                                            !filters.SORT_CHECKIN_ASCENDING
                                        )
                                    }>
                                    Ascending
                                </div>
                                <div
                                    className={`text-xs md:text-sm py-1 border border-gray-400 mx-1 cursor-pointer px-2 rounded-full ${
                                        !filters.SORT_CHECKIN_ASCENDING
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-100"
                                    }`}
                                    onClick={() =>
                                        setFilter(
                                            "SORT_CHECKIN_ASCENDING",
                                            !filters.SORT_CHECKIN_ASCENDING
                                        )
                                    }>
                                    Descending
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between flex-wrap">
                            <div className="flex py-2 px-2">
                                <div
                                    className={`text-xs md:text-sm py-1 border border-gray-400 mx-1 cursor-pointer px-2 rounded-full ${
                                        filters.SHOW_DELETED
                                            ? "bg-red-600 text-white"
                                            : "bg-gray-100"
                                    }`}
                                    onClick={() =>
                                        setFilter(
                                            "SHOW_DELETED",
                                            !filters.SHOW_DELETED
                                        )
                                    }>
                                    Show Deleted
                                </div>
                            </div>
                            <div className="flex py-2 px-2">
                                {Object.values(BOOKING_CHECKIN_STATUS).map(
                                    (status) => (
                                        <div
                                            key={status.type}
                                            className={`flex items-center text-xs md:text-sm py-1 border border-gray-400 mx-1 cursor-pointer px-2 rounded-full ${
                                                filters.STATUS_CHECKIN ===
                                                status.type
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-gray-100"
                                            }`}
                                            onClick={() =>
                                                setFilter(
                                                    "STATUS_CHECKIN",
                                                    status.type
                                                )
                                            }>
                                            {status.string}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex pt-5 pb-5 border-b bg-gray-100 pl-3 pr-3">
                        <div className="w-1/12 text-gray-800 uppercase font-medium text-sm md:text-base truncate">
                            ID
                        </div>
                        <div className="w-4/12 md:w-3/12 text-gray-800 uppercase font-medium text-sm md:text-base truncate">
                            User
                        </div>
                        <div className="hidden md:block w-2/12 text-gray-800 uppercase font-medium text-sm md:text-base truncate">
                            Category
                        </div>
                        <div className="w-3/12 text-gray-800 uppercase font-medium text-sm md:text-base truncate">
                            Checkin
                        </div>
                        <div className="w-4/12 md:w-3/12 text-gray-800 uppercase font-medium text-sm md:text-base truncate">
                            Status
                        </div>
                    </div>
                    {showBookingList(bookings)}
                </div>
            </div>
            {showUpdation.shown && (
                <UpdateBooking
                    toggle={toggle}
                    shown={showUpdation.shown}
                    data={showUpdation.data}
                    id={id}
                    user_details={details}
                />
            )}
        </div>
    );
}
