import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { A } from "hookrouter";

import { getUserHotelList, getHotelRoomList } from "../../Redux/actions";
import DeleteConfirmation from "./DeleteConfirmation";

export default function FacilitatorViewHotel({ id }) {

    const [showConfirmation, setShowConfirmation] = useState(false);

    const state = useSelector(state => state);
    const { currentUser: temp } = state;
    const currentUser = temp && temp.data && temp.data.data;

    const dispatch = useDispatch();
    const { userHotelList } = state;
    const { hotelRoomList } = state;

    useEffect(() => {
        dispatch(getUserHotelList(currentUser.id));
        dispatch(getHotelRoomList(id));
    }, [dispatch, currentUser.id, id]);

    function star(num) {
        return (
            <svg key={num.toString()} className="w-6 h-6 mr-1" viewBox="0 0 300 275" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polygon fill="#2D3748" stroke="#2D3748" strokeWidth="15" points="150,25  179,111 269,111 197,165 223,251  150,200 77,251  103,165 31,111 121,111" />
            </svg>
        );
    }

    function listRooms(rooms) {
        if (rooms.length > 0) {

            return (
                rooms.map(room => {
                    const r = room[0];
                    return (
                        <div key={r.title} className="md:w-1/2 lg:w-1/3">
                            <div key={r.title} className="mx-5 my-5 flex flex-col shadow-lg bg-indigo-100 rounded">
                                <div className="">
                                    <img alt={r.title} className="w-full rounded" src="https://images.unsplash.com/photo-1515362778563-6a8d0e44bc0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=350&q=80" />
                                </div>
                                <div className="py-3 px-3">
                                    <div className="flex flex-wrap items-center justify-between">
                                        <div className="text-gray-800 text-lg uppercase font-medium">
                                            {r.title}
                                        </div>
                                        <div className="flex items-center">
                                            <div className="text-xs px-2 bg-black text-white rounded font-bold uppercase tracking-wide text-center">
                                                {r.category}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap pb-3">
                                        {
                                            r.features.split(",").map(el => (
                                                <div key={el} className="text-xs text-gray-900 mr-2 bg-gray-400 px-2 rounded tracking-wide">{el}</div>
                                            ))
                                        }
                                    </div>
                                    <div className="text-gray-600 pb">
                                        {r.description}
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between border-b pb-3">
                                        <div className="text-gray-800">
                                            Beds: {r.beds}
                                        </div>
                                        <div className="flex items-center ml-2">
                                            <div className="text-2xl text-gray-900 font-bold tracking-wide flex">
                                                <svg className="w-4 h-4 mt-2 fill-current" viewBox="39.5 -0.5 169.756 250">
                                                    <path d="M152.511,23.119h41.031L209.256-0.5H55.214L39.5,23.119h26.739c27.086,0,52.084,2.092,62.081,24.743H55.214 L39.5,71.482h91.769c-0.002,0.053-0.002,0.102-0.002,0.155c0,16.974-14.106,43.01-60.685,43.01l-22.537-0.026l0.025,22.068 L138.329,249.5h40.195l-93.42-116.709c38.456-2.074,74.523-23.563,79.722-61.309h28.716l15.714-23.62h-44.84 C162.606,38.761,158.674,29.958,152.511,23.119z" />
                                                </svg>
                                                {r.cost}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between py-2">
                                        <div className="text-gray-800 font-medium py-2">
                                            AVAILABLE: {room.filter(r => r.status === "AVAILABLE").length}/{room.length}
                                        </div>
                                        <div className="flex py-2">
                                            <A href="#" className="bg-indigo-600 hover:bg-indigo-800 rounded px-3 py-1 mx-1 font-medium text-white">
                                                Edit
                                            </A>
                                            <A href="#" className="bg-red-700 hover:bg-red-800 rounded px-3 py-1 mx-1 font-medium text-white">
                                                Delete
                                            </A>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            );
        } else {
            return (
                <div className="text-gray-500 py-8 text-center text-xl w-full">You currently have no rooms</div>
            );
        }
    }

    // check if loading
    if (!userHotelList || userHotelList.isFetching || !hotelRoomList || hotelRoomList.isFetching) {
        return <div className="lds-dual-ring h-screen w-screen items-center justify-center overflow-hidden flex"></div>
    }

    if (userHotelList.error || hotelRoomList.error) {
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden">
                <div className="text-5xl text-gray-400">Some problem occured, please try again</div>
            </div>
        );
    }

    const currentHotel = userHotelList.data && userHotelList.data.data && Object.values(userHotelList.data.data).find(el => el.hotelId === id);

    // check if the hotel actually exists
    // and if this user is the owner
    if (!currentHotel || (currentHotel.ownerID !== currentUser.id)) {
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden">
                <div className="text-5xl text-gray-400">Hotel was not found</div>
                <A href="/" className="flex items-center text-xl m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                    Home
                </A>
            </div>
        );
    }

    function toggleConfirmation() {
        setShowConfirmation(!showConfirmation);
    }

    const hotelRoomData = hotelRoomList.data && [...new Set(hotelRoomList.data.data
        .map(e => e.title))]
        .map(e =>
            hotelRoomList.data.data.filter(el => el.title === e)
        );

    const totalRoomData = [].concat(...hotelRoomData);
    const totalRoomBooked = totalRoomData.length - (totalRoomData).filter(e => e.status === "AVAILABLE").length;
    let styleWidth = parseInt((totalRoomBooked / totalRoomData.length) * 12);

    return (
        <div className="font-sans bg-gray-lighter flex flex-col w-full min-h-screen overflow-x-hidden">
            <div className="flex-col flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                <div className="bg-white border-t border-b rounded shadow mb-6 md:mx-0 mx-2 flex flex-wrap">
                    <div className="w-full lg:w-2/5">
                        <img alt={currentHotel.name} className="w-full h-full rounded" src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=450&q=100" />
                    </div>
                    <div className="flex flex-col w-full lg:w-3/5 md:pl-10 px-5 py-5">
                        <div className="flex flex-wrap items-center text-4xl text-gray-800 uppercase">
                            <div className="mr-4">
                                {currentHotel.name}
                            </div>
                            <div className="flex">

                                {Array.apply(null, { length: currentHotel.starCategory }).map((el, num) => star(num))}
                            </div>
                        </div>
                        <div className="text-gray-600">
                            {currentHotel.address}, {currentHotel.panchayath}, {currentHotel.district}
                        </div>
                        <div className="flex flex-wrap py-2">
                            {
                                currentHotel.facilities.split(",").map(el => (
                                    <div key={el} className="text-sm text-gray-900 mr-2 bg-gray-400 px-2 rounded tracking-wide">{el}</div>
                                ))
                            }
                        </div>
                        <div className="text-white flex py-5">
                            <div className="text-sm py-1 px-2 bg-green-600 text-white font-bold uppercase tracking-wide text-center">
                                {currentHotel.status}
                            </div>
                        </div>
                        <div className="text-gray-600 text-sm">
                            {currentHotel.policy}
                        </div>
                        <div className="text-gray-600 text-sm">
                            {currentHotel.contact}
                        </div>
                        <div className="flex-grow flex flex-col justify-center items-end py-50">
                            <div className="text-xs font-bold text-gray-800">
                                {totalRoomBooked}/{totalRoomData.length} booked
                            </div>
                            <div className="bg-indigo-200 w-full rounded-full">
                                <div className={`w-0 w-${styleWidth}/12 bg-indigo-600 h-2 rounded-full`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full mb-6">
                    <div className="bg-white rounded sm:border shadow md:mx-0 mx-2 pb-1">
                        <div className="border-b">
                            <div className="flex px-6 -mb-px items-center">
                                <h3 className="text-blue-dark py-4 font-normal text-lg">Actions</h3>
                                {
                                    (currentHotel.ownerID === currentUser.id) &&
                                    <div className="flex items-center ml-2">
                                        <div className="text-sm py-1 px-2 bg-green-600 text-white font-bold uppercase tracking-wide text-center">owner</div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-evenly">
                            <A href={`/hotel/${currentHotel.hotelId}/bookings`} className="flex items-center text-lg m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                                View Bookings
                            </A>
                            <A href={`/hotel/${currentHotel.hotelId}/room/add`} className="flex items-center text-lg m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                                Add Rooms
                            </A>
                            <A href={`/hotel/${currentHotel.hotelId}/edit`} className="flex items-center text-lg m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                                Edit Hotel
                            </A>
                            <div onClick={toggleConfirmation} className="cursor-pointer flex items-center text-lg m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                                Delete Hotel
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-4">
                    <div className="w-full mb-6 px-4 flex flex-col">
                        <div className="flex-grow flex flex-col bg-white md:mx-0 mx-2 rounded shadow overflow-x-hidden">
                            <div className="border-b">
                                <div className="flex justify-between px-6 -mb-px">
                                    <h3 className="text-indigo-900 py-4 font-normal text-lg">
                                        Rooms
                                    </h3>
                                </div>
                            </div>
                            <div className="p-5 flex flex-wrap justify-center md:justify-start">
                                {
                                    listRooms(hotelRoomData)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteConfirmation
                show={showConfirmation}
                toggle={toggleConfirmation}
                booked={totalRoomBooked}
                name={currentHotel.name}
                id={currentHotel.hotelId}
                rooms={totalRoomData.length}
                />
        </div>
    );
}