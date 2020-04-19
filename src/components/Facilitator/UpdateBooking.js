import React, { useState, useEffect } from "react";

export default function UpdateBooking({ toggle, data, shown }) {

    const [roomError, setRoomError] = useState(false);
    const [roomno, setRoomno] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);
    
    useEffect(() => {
        setRoomno(data.roomno);
    }, [data.roomno]);
    
    function updateRoomno() {
        setRoomError(false);
        if (roomno) {
            console.log("update room no to", roomno);
        } else {
            setRoomError(true);
        }
    }
    
    function del() {
        if (confirmDelete) {
            console.log("continue to deletion");
        } else {
            setConfirmDelete(true);
        }
    }
    
    function back() {
        setConfirmDelete(false);
        toggle(data.bookingId)
    }
    
    return (
        <div className={`${shown? "flex": "hidden"} fixed top-0 left-0 bg-gray-200 h-screen w-full items-center justify-center`}>
            <div className="pb-8 px-0 md:w-1/2 w-full bg-white shadow-lg mx-5 rounded">
                <div className="uppercase bg-indigo-600 pt-3 px-5 pb-2 text-lg text-white font-bold tracking-wide rounded-t">
                    Booking ID: {data.bookingId}
                </div>
                <div className="px-5">
                    <div className="pb-8 pt-3 px-0 text-gray-800">
                        <div className="flex flex-wrap justify-center">

                        <div className="flex col pb-8 pt-2 mx-5 flex-grow items-center justify-center">
                            <div className="pb-8">
                                <label className="block font-bold text-xl" htmlFor="roomno">
                                    Room No
                                </label>
                                <div className="w-40 h-8">
                                    <input
                                        className={`bg-gray-200 text-center appearance-none border-2 border-gray-400 ${roomError? "border-red-700": ""} rounded w-full py-2 px-4 text-5xl font-bold text-gray-800 leading-tight focus:outline-none focus:border-indigo-600`}
                                        type="text"
                                        onChange={(e) => setRoomno(e.target.value)}
                                        value={roomno}
                                        />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col px-12">
                            <div className="flex">
                                <div className="font-bold w-24">Name</div>
                                <div className="">{data.name}</div>
                            </div>
                            <div className="flex">
                                <div className="font-bold w-24">Email</div>
                                <div className="">{data.email}</div>
                            </div>
                            <div className="flex">
                                <div className="font-bold w-24">Category</div>
                                <div className="">{data.category}</div>
                            </div>
                            <div className="flex">
                                <div className="font-bold w-24">Check In</div>
                                <div className="">{data.checkin}</div>
                            </div>
                            <div className="flex">
                                <div className="font-bold w-24">Booked</div>
                                <div className="">{data.booking}</div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="flex justify-between font-bold tracking-wide">
                        <div className="flex" onClick={back}>
                            <div className="flex items-center justify-center p-2 px-3 md:px-6 rounded bg-gray-300  hover:bg-gray-400 cursor-pointer">
                                Back
                            </div>
                        </div>
                        <div className="flex text-white">
                            <div onClick={del} className="flex items-center justify-center p-2 px-3 md:px-6 rounded mr-2 bg-red-700 hover:bg-red-800 cursor-pointer">
                                {
                                    confirmDelete
                                    ? 
                                        "Sure ?"
                                    :
                                        "Delete"
                                }
                            </div>
                            <div onClick={updateRoomno} className="flex items-center justify-center p-2 px-3 md:px-6 rounded mr-2 bg-indigo-600 hover:bg-indigo-800 cursor-pointer">
                                Check In
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}