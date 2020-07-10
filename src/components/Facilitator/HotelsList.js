import React, { useState } from "react";
import Star from "../common/Star";
import { HOTEL_STATUS } from "../../Common/constants";
import { A } from "hookrouter";

export default function HotelsList({ hotelList = [], isAdmin }) {
    const maxLimit = 12;
    let i = 0;
    const [offset, setOffset] = useState(0);
    const hotel = Object.values(hotelList);
    const totalPage = Math.ceil(hotel.length / maxLimit);
    const getPageNumbers = (current) => {
        let n = 3;
        let m = current - 2;
        const pageNumbers = [];
        if (current === 1) {
            if (totalPage === 0) {
                return [1];
            }
            if (totalPage < 3)
                n = totalPage;
            for (i = 1; i <= n; i++) {
                pageNumbers.push(i);
            }
        }
        else if (current < totalPage) {
            for (i = current - 1; i <= current + 1; i++) {
                pageNumbers.push(i);
            }
        }
        else {
            if (current - 2 < 1)
                m = 1;
            for (i = m; i <= current; i++) {
                pageNumbers.push(i);
            }
        }
        return pageNumbers;
    };
    const handlePage = (pageNo) => {
        console.log(pageNo);
        if (pageNo == 1) {
            setPagenumbers(getPageNumbers(1));
        }
        else {
            setPagenumbers(getPageNumbers(pageNo));
        }
        setOffset((pageNo - 1) * maxLimit)
    };
    const [pageNumbers, setPagenumbers] = useState(getPageNumbers(1));
    function showHotels(data) {
        let hotels = Object.values(data);
        if (hotels.length > 0) {
            return hotels.slice(offset, offset + maxLimit).map((hotel) => (
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
            <div className={` ${totalPage === 1 ? "hidden" : "sm:flex-1 mt-2 text-center justify-between"}`}>
                <div>
                    <nav className="inline-flex shadow-sm">
                        <button
                            type="button"
                            key={`page_${1}`}
                            className={`-ml-px  "hover:text-gray-800" relative inline-flex items-center font-semibold px-4 py-3 border border-gray-300 text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-green-300 focus:shadow-outline-green transition ease-in-out duration-150 bg-white hover:bg-gray-200'}`}
                            onClick={() => handlePage(1)}>
                            First
                        </button>
                        {pageNumbers.map((pageNo) => (
                            <button
                                type="button"
                                key={`page_${pageNo}`}
                                className={`-ml-px ${
                                    pageNo === offset / maxLimit + 1
                                        ? "bg-indigo-700 hover:bg-indigo-800 text-white"
                                        : "hover:text-gray-800"
                                    } relative inline-flex items-center font-semibold px-4 py-3 border border-gray-300 text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-green-300 focus:shadow-outline-green transition ease-in-out duration-150 bg-white hover:bg-gray-200'}`}
                                onClick={() => handlePage(pageNo)}>
                                {pageNo}
                            </button>
                        ))}
                        <button
                            type="button"
                            key={`page_${totalPage}`}
                            className={`-ml-px  "hover:text-gray-800" relative inline-flex items-center font-semibold px-4 py-3 border border-gray-300 text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-green-300 focus:shadow-outline-green transition ease-in-out duration-150 bg-white hover:bg-gray-200'}`}
                            onClick={() => handlePage(totalPage)}>
                            Last
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
