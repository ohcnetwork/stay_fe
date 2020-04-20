import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { A } from "hookrouter";

import { BOOKING_CHECKIN_STATUS } from "../../Common/constants";
import { getHotelBookingList } from "../../Redux/actions";
import UpdateBooking from "./UpdateBooking";

export default function ViewBooking({ id }) {

    const state = useSelector(state => state);
    const { hotelBookingList } = state;
    const dispatch = useDispatch();
    const [ showUpdation, setShowUpdation ] = useState({ shown: false, data: "" });

    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    useEffect(() => {
        dispatch(getHotelBookingList(id));
    }, [dispatch, id]);

    function toggle(id) {
        setShowUpdation({ shown: !showUpdation.shown, data: bookings.find(b => b.bookingId === id) });
    }

    function dateString(date) {
        const tme = new Date(date);
        const mnt = months[tme.getMonth()].toUpperCase();
        const dat = tme.getDate();
        const year = tme.getFullYear();
        let hours = tme.getHours() % 12;
        hours = ((hours < 10)? "0": "") + hours;
        let minutes = tme.getMinutes();
        minutes = ((minutes < 10)? "0": "") + minutes;
        const suffix = (hours % 12 < 1)? "AM": "PM";

        return (
            <div className="">
                <div className="">{dat} {mnt} {year}</div>
                <div>{hours}:{minutes} {suffix}</div>
            </div>
        );
    }

    function showBookingList(bookings) {
        if (bookings.length > 0) {
            return (
                bookings.map(booking => 
                    <div 
                        key={booking.bookingId.toString()} 
                        className="flex pt-5 pb-5 border-b pl-3 pr-3 bg-white hover:bg-gray-200 cursor-pointer"
                        onClick={() => {toggle(booking.bookingId)}}
                        >
                        <div className="w-1/12 text-gray-700 text-sm md:text-base">
                            {booking.bookingId}
                        </div>
                        <div className="w-4/12 md:w-3/12 text-gray-700 text-sm md:text-base">
                            <div>{booking.name}</div>
                            <div className="text-gray-600 md:text-sm text-xs truncate">{booking.email}</div>
                        </div>
                        <div className="w-2/12 text-gray-700 text-sm md:text-base uppercase md:block hidden">
                            {booking.category}
                        </div>
                        <div className="w-3/12 text-gray-700 text-sm md:text-base">
                            {booking.checkin}
                        </div>
                        <div className="w-4/12 md:w-3/12 text-gray-900 text-sm md:text-base flex items-center text-xs">
                                <div className={`font-bold uppercase px-1 text-white rounded bg-${BOOKING_CHECKIN_STATUS[booking.statusCheckin].color}`}>
                                    {BOOKING_CHECKIN_STATUS[booking.statusCheckin].string}
                                </div>
                        </div>
                    </div> 
                )
            );
        } else {
            return (
                <div className="text-gray-500 py-8 text-center text-xl w-full">This hotel has no bookings</div>
            );
        }
    }

    if (!hotelBookingList || hotelBookingList.isFetching) {
        return <div className="lds-dual-ring h-screen w-screen items-center justify-center overflow-hidden flex"></div>
    }

    if (hotelBookingList.error) {
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden">
                <div className="text-5xl text-gray-400">Some problem occured</div>
                <A href="/" className="flex items-center text-xl m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                    Home
                </A>
            </div>
        );
    }

    // TODO: check if hotel exists
    console.log(hotelBookingList);
    
    let bookings = hotelBookingList.data && hotelBookingList.data.data.filter(e => e) || [];
    bookings.forEach((b, i) => {
        bookings[i].checkin = dateString(b.checkinDate);
        bookings[i].booking = dateString(b.bookingDate);
        bookings[i].roomno = "";
    });

    return (
        <div className="font-sans bg-gray-lighter flex flex-col w-full min-h-screen overflow-x-hidden">
            <div className="flex-col flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                <div className="bg-white border-t border-b sm:rounded shadow mb-6 mx-0 mx-2">
                    <h2 className="pt-5 pb-10 pl-5 md:pl-10 flex flex-wrap items-center md:text-4xl text-2xl text-gray-800 uppercase border-b bg-gray-100">
                        booking details
                    </h2>
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
                    {
                        showBookingList(bookings)
                    }
                </div>      
            </div>
            { showUpdation.shown && <UpdateBooking toggle={toggle} shown={showUpdation.shown} data={showUpdation.data} hotelId={id} /> }
        </div>
    );
}