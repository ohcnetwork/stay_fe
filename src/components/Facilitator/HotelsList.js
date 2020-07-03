import React, { useState } from "react";
import Star from "../common/Star";
import { HOTEL_STATUS } from "../../Common/constants";
import { A } from "hookrouter";
import Pagination from "../common/Pagination";

export default function HotelsList({ hotelList = [], isAdmin }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 14;
    const [offset, setOffset] = useState(0);
    const handlePagination = (page, limit) => {
        const offset = (page - 1) * limit;
        setCurrentPage(page);
        setOffset(offset);
    };
    function showHotels(data) {
        let hotels = Object.values(data);

        if (hotels.length > 0) {
            setTotalCount(hotels.length);

            return hotels.map((hotel) => (

                <A

                    key={hotel.id.toString()}
                    href={
                        isAdmin
                            ? `/hotel/${hotel.id}/bookings`
                            : `/hotel/${hotel.id}`
                    }
                    className="flex px-6 py-6 text-gray-800 items-center border-b -mx-4 hover:bg-gray-200 cursor-pointer">
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
                        <div className="w-1/2 text-left truncate flex">
                            <Star num={hotel.starCategory} dim={4} />
                        </div>
                    </div>
                    <div className="w-1/4 px-1 flex flex-col justify-around items-center">
                        <div className="flex">
                            <div
                                className={`text-sm py-1 px-2 bg-${
                                    HOTEL_STATUS[hotel.status].color
                                    } text-white font-bold uppercase tracking-wide text-center`}>
                                {HOTEL_STATUS[hotel.status].string}
                            </div>
                        </div>
                    </div>
                </A>

            ));
        } else {
            return (
                <div className="text-gray-500 py-8 text-center text-xl">
                    You currently have no hotels
                </div>
            );
        }
    }

    return (
        <div className="flex-grow flex flex-col bg-white md:mx-0 mx-2 rounded shadow overflow-x-hidden overflow-y-auto">
            <div className="border-b">
                <div className="flex justify-between px-6 -mb-px">
                    <h3 className="text-indigo-900 py-4 font-normal text-lg">
                        Your Hotels
                        <span className="ml-2 text-sm text-gray-500">
                            Click one to see more
                        </span>
                    </h3>
                </div>
            </div>
            {hotelList && showHotels(hotelList)}
            <div className="d-flex flex-row py-4 justify-content-end">
                <Pagination
                    cPage={currentPage}
                    defaultPerPage={limit}
                    data={{ totalCount }}
                    onChange={handlePagination}
                />
            </div>
        </div>


    );
}
