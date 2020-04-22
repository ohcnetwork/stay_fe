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
    const availableFilters = {
        STATUS_CHECKIN: (el, status) => el.filter(e => e.statusCheckin === status)
    }
    const [ filters, setFilters ] = useState({
        STATUS_CHECKIN: BOOKING_CHECKIN_STATUS.PENDING.type
    });

    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    useEffect(() => {
        dispatch(getHotelBookingList(id));
    }, [dispatch, id]);

    function setFilter (type, value) {
        setFilters({...filters, [type]: value});
    }

    function toggle(id) {
        setShowUpdation({ shown: !showUpdation.shown, data: bookings.find(b => b.book_id === id) });
    }

    function dateString(date, extended = false) {
        const tme = new Date(date);
        const mnt = months[tme.getUTCMonth()].toUpperCase();
        const dat = tme.getUTCDate();
        const year = tme.getUTCFullYear();
        let hours = tme.getHours();
        hours = ((hours < 10)? "0": "") + hours;
        let minutes = tme.getMinutes();
        minutes = ((minutes < 10)? "0": "") + minutes;
        return (
            <div className="">
                {dat} {mnt} {year}
                { extended && <span> {hours}:{minutes}</span>}
            </div>
        );
    }

    function showBookingList(bookings) {
        if (bookings.length > 0) {
            const filteredBookings = Object.keys(filters).reduce((prev, fil, i) => {
                return availableFilters[fil](prev, filters[fil])
            }, bookings);
            return (
                filteredBookings.map(booking => 
                    <div 
                        key={booking.book_id.toString()} 
                        className="flex pt-5 pb-5 border-b pl-3 pr-3 bg-white hover:bg-gray-200 cursor-pointer"
                        onClick={() => {toggle(booking.book_id)}}
                        >
                        <div className="w-1/12 text-gray-700 text-sm md:text-base">
                            {booking.book_id}
                        </div>
                        <div className="w-4/12 md:w-3/12 text-gray-700 text-sm md:text-base">
                            <div>{booking.user.name}</div>
                            <div className="text-gray-600 md:text-sm text-xs truncate">{booking.user.email}</div>
                        </div>
                        <div className="w-2/12 text-gray-700 text-sm md:text-base uppercase md:block hidden">
                            {booking.room.category}
                        </div>
                        <div className="w-3/12 text-gray-700 text-sm md:text-base">
                            {booking.checkinString}
                        </div>
                        <div className="w-4/12 md:w-3/12 text-gray-900 text-sm md:text-base flex items-center text-xs">
                                <div className={`font-bold uppercase px-1 text-white bg-${BOOKING_CHECKIN_STATUS[booking.statusCheckin].color}`}>
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

    // check if hotel exists
    if (hotelBookingList.error || !hotelBookingList.data) {
        let msg = (hotelBookingList.error)? "Some problem occurred": "Hotel was not found";
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden">
                <div className="text-5xl text-gray-400">{msg}</div>
                <A href="/" className="flex items-center text-xl m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                    Home
                </A>
            </div>
        );
    } 
    
    let bookings = (hotelBookingList.data && hotelBookingList.data.filter(e => e))|| [];
    bookings.forEach((b, i) => {
        bookings[i].checkinString = dateString(b.checkin);
        bookings[i].checkoutString = dateString(b.checkout);
        bookings[i].createdAtString = dateString(b.createdAt, true);
        bookings[i].roomno = "";
    });
    console.log(bookings);


    return (
        <div className="font-sans bg-gray-lighter flex flex-col w-full min-h-screen overflow-x-hidden">
            <div className="flex-col flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                <div className="bg-white border-t border-b sm:rounded shadow mb-6 mx-0 mx-2">
                    <div className="pt-5 border-b bg-gray-100">
                        <h2 className="flex px-5 md:pl-10 flex-wrap items-center md:text-4xl text-2xl text-gray-800 uppercase">Booking Details</h2>
                        <div className="flex items-center justify-end">
                            <div className="flex py-2 px-2">
                                {
                                    Object.values(BOOKING_CHECKIN_STATUS).map(status => 
                                        <div 
                                            className={`text-xs md:text-sm py-1 border border-indigo-200 mx-1 cursor-pointer px-2 rounded-full font-medium ${filters.STATUS_CHECKIN === status.type? "bg-indigo-600 text-white": "bg-gray-100"}`}
                                            onClick={() => setFilter("STATUS_CHECKIN", status.type)}>
                                            {status.string}
                                        </div>
                                    )
                                }
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
                    {
                        showBookingList(bookings)
                    }
                </div>      
            </div>
            { showUpdation.shown && <UpdateBooking toggle={toggle} shown={showUpdation.shown} data={showUpdation.data} id={id} /> }
        </div>
    );
}