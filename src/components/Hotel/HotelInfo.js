import React, { useState, useEffect } from "react";
import { HOTEL_STATUS, DEFAULT_IMAGE } from "../../Common/constants";
import Star from "../common/Star";

export default function HotelInfo({ data }) {
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        setHotel(data);
    }, [data]);

    if (!hotel) {
        return null;
    }

    return (
        <div className="bg-white border-t border-b rounded shadow flex flex-wrap">
            <div className="w-full lg:w-2/5">
                <img
                    alt={hotel.name}
                    className="w-full h-full rounded"
                    src={DEFAULT_IMAGE.HOTEL}
                />
            </div>
            <div className="flex flex-col w-full lg:w-3/5 md:pl-10 px-5 py-5">
                <div className="flex flex-wrap items-center text-4xl text-gray-800 uppercase">
                    <div className="mr-4">{hotel.name}</div>
                    <div className="flex">
                        <Star num={hotel.starCategory} />
                    </div>
                </div>
                <div className="text-gray-600">
                    {hotel.address},{" "}
                    {hotel.panchayath && <span>{hotel.panchayath},</span>}{" "}
                    {hotel.district}
                </div>
                <div className="flex flex-wrap py-2">
                    {(hotel.facilities || "").split(",").map((el) => (
                        <div
                            key={el}
                            className="text-sm text-gray-900 mr-2 bg-gray-400 px-2 rounded tracking-wide">
                            {el.replace("_", " ")}
                        </div>
                    ))}
                </div>
                <div className="text-white flex py-5">
                    <div
                        className={`text-sm py-1 px-2 bg-${
                            HOTEL_STATUS[hotel.status].color
                        } text-white font-bold uppercase tracking-wide text-center`}>
                        {HOTEL_STATUS[hotel.status].string}
                    </div>
                </div>
                <div className="text-gray-600 text-sm">
                    Policy: {hotel.policy}
                </div>
                <div className="text-gray-600 text-sm">
                    Contact: {hotel.contact}
                </div>
                {/* <div className="flex-grow flex flex-col justify-center items-end py-50">
                    <div className="text-xs font-bold text-gray-800">
                        {totalRoomBooked}/{totalRoomData.length} booked
                    </div>
                    <div className="bg-indigo-200 w-full rounded-full">
                        <div className={`w-0 w-${styleWidth}/12 bg-indigo-600 h-2 rounded-full`}></div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
