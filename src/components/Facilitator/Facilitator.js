import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { A } from "hookrouter";

import { getUserHotelList } from "../../Redux/actions";

export default function Facilitator() {

    const state = useSelector(state => state);
    const { currentUser: temp } = state;
    const currentUser = temp.data.data;

    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const accountCreation = new Date(currentUser.createdAt);

    const dispatch = useDispatch();
    const { userHotelList } = state;

    useEffect(() => {
        dispatch(getUserHotelList(currentUser.id));
    }, [dispatch, currentUser.id]);

    function timeString(tme) {
        let hours = tme.getHours() % 12;
        hours = ((hours < 10)? "0": "") + hours;
        let minutes = tme.getMinutes();
        minutes = ((minutes < 10)? "0": "") + minutes;
        const suffix = (hours % 12 < 1)? "AM": "PM";

        return `${hours}:${minutes} ${suffix}`;
    }

    function showHotels(data) {
        let hotels = Object.values(data);
        if (hotels.length > 0) {
            return (
                hotels.map(hotel => 
                    <A key={hotel.hotelId.toString()} href={`/hotel/${hotel.hotelId}`} className="flex px-6 py-6 text-gray-800 items-center border-b -mx-4 hover:bg-gray-200 cursor-pointer">
                        <div className="w-1/2 lg:w-2/5 px-2 capitalize text-left font-semibold">
                        <span className="text-md md:text-lg">{hotel.name}</span>
                        </div>
                        <div className="w-1/4 lg:w-1/5 text-left text-gray-600 truncate">
                            {hotel.district}
                            </div>
                        <div className="hidden lg:flex w-1/5 px-1 text-left text-gray-600">
                            <div className="w-1/2 text-left truncate">
                                {hotel.panchayath}
                                </div>
                            <div className="w-1/2 text-left truncate">
                                {hotel.starCategory} Star
                                </div>
                        </div>
                        <div className="w-1/4 px-1 flex flex-col justify-around items-center">
                            <div className="flex">
                                <div className="text-sm py-1 px-2 bg-green-600 text-white rounded font-bold uppercase tracking-wide text-center">{hotel.status}</div>
                            </div>
                        </div>
                    </A>
                )
            );
        } else {
            return (
                <div className="text-gray-500 py-8 text-center text-xl">You currently have no hotels</div>
            );
        }
    }

    if (!userHotelList || userHotelList.isFetching) {
        return <div className="lds-dual-ring h-screen w-screen items-center justify-center overflow-hidden flex"></div>
    }


    return (
        <div className="font-sans bg-gray-lighter flex flex-col w-full min-h-screen overflow-x-hidden">
            <div className="flex-col flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                <div className="bg-white border-t border-b sm:rounded shadow mb-6 md:mx-0 mx-2">
                    <div className="border-b px-6 py-2">
                        <div className="flex md:justify-between justify-around -mb-px py-1 flex-col md:flex-row">
                            <div className="flex flex-col">
                                <div className="uppercase text-3xl text-center md:text-left text-gray-800">{currentUser.name}</div>
                                <div className="text-center md:text-left text-gray-600 truncate">{currentUser.email}</div>
                            </div>
                            <div className="flex items-center justify-center md:pt-0 pt-5">
                                <div className="flex items-center ">
                                    <div className="items-center text-sm py-1 px-2 bg-green-600 text-white rounded font-bold uppercase tracking-wide">{currentUser.type}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col">
                        <div className="md:w-1/3 text-center py-8">
                            <div className="border-r">
                                <div className="text-gray-800 mb-2">
                                    <span className="text-5xl">{userHotelList && Object.values(userHotelList.data.data).length}</span>
                                </div>
                                <div className="text-sm uppercase text-gray-600 tracking-wide">
                                    Hotels
                                    </div>
                            </div>
                        </div>
                        <div className="md:w-1/3 text-center py-8">
                            <div className="border-r">
                                <div className="text-gray-800 mb-2">
                                    <span className="text-5xl uppercase">{currentUser.status}</span>
                                </div>
                                <div className="text-sm uppercase text-gray-600 tracking-wide">
                                    Account Status
                                    </div>
                            </div>
                        </div>
                        <div className="md:w-1/3 text-center py-8">
                            <div className="border-r">
                                <div className="text-gray-800 mb-2">
                                    <div className="text-2xl uppercase">{accountCreation.getDate()} {months[accountCreation.getMonth()]}</div>
                                    <div className="text-2xl uppercase">{timeString(accountCreation)}</div>
                                </div>
                                <div className="text-sm uppercase text-gray-600 tracking-wide">
                                    Created On
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full mb-6">
                    <div className="bg-white rounded sm:border shadow md:mx-0 mx-2 pb-1">
                        <div className="border-b">
                            <div className="flex justify-between px-6 -mb-px">
                                <h3 className="text-blue-dark py-4 font-normal text-lg">Actions</h3>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-evenly">
                            <A href="/hotel/add" className="flex items-center text-lg m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                                Add Hotel
                            </A>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-4">
                    <div className="w-full mb-6 px-4 flex flex-col">
                        <div className="flex-grow flex flex-col bg-white md:mx-0 mx-2 rounded shadow overflow-x-hidden overflow-y-auto">
                            <div className="border-b">
                                <div className="flex justify-between px-6 -mb-px">
                                    <h3 className="text-indigo-900 py-4 font-normal text-lg">
                                        Your Hotels
                                        <span className="ml-2 text-sm text-gray-500">Click one to see more</span>
                                    </h3>
                                </div>
                            </div>
                            {
                                userHotelList && showHotels(userHotelList.data.data)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}