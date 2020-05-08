import React, { useState, useEffect } from "react";
import { HOTEL_STATUS, DEFAULT_IMAGE } from "../../Common/constants";
import Carousal from "../common/Carousal";
import Star from "../common/Star";

export default function HotelInfo({ data }) {
    const [hotel, setHotel] = useState(null);
    const controlCarousal = useState(false);
    const [readmore, setreadmore] = useState(false);
    useEffect(() => {
        setHotel(data);
    }, [data]);

    if (!hotel) {
        return null;
    }
    var policyLength = 250;
    var readLessPolicy = "";
    const getLessPolicy = (len) => {
        if (hotel.policy.length > len) {
            readLessPolicy = hotel.policy.slice(0, len) + "...";
        }
    };
    const changeread = () => {
        setreadmore(!readmore);
    };
    getLessPolicy(policyLength);

    const previewImage =
        (hotel.photos && hotel.photos[0]) || DEFAULT_IMAGE.HOTEL;

    return (
        <div className="bg-white border-t border-b rounded shadow flex flex-wrap">
            <div className="flex items-center w-full lg:w-2/5">
                <img
                    onClick={() => controlCarousal[1](true)}
                    alt={hotel.name}
                    className={`w-full h-64 rounded object-cover ${
                        hotel.photos && hotel.photos.length >= 1
                            ? "cursor-pointer"
                            : ""
                    } `}
                    src={previewImage}
                />
            </div>
            <div className="flex flex-col w-full lg:w-3/5 md:pl-10 px-5 py-5">
                <div className="flex flex-wrap items-center text-4xl text-gray-800 uppercase">
                    <div className="mr-4">{hotel.name}</div>
                    <div className="flex">
                        <Star num={hotel.starCategory} />
                    </div>
                </div>
                <div className="text-gray-600 break-all">
                    {hotel.address},{" "}
                    {hotel.panchayath && <span>{hotel.panchayath},</span>}{" "}
                    {hotel.district}
                </div>
                <div className="flex flex-wrap py-2">
                    {(hotel.facilities || "").split(",").map((el) => (
                        <div
                            key={el}
                            className="text-sm text-gray-900 mr-2 bg-gray-400 px-2 rounded tracking-wide uppercase">
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
                    <span className="text-gray-700 font-semibold">
                        Policy :
                    </span>{" "}
                    {hotel.policy.length > policyLength
                        ? readmore
                            ? hotel.policy
                            : readLessPolicy
                        : hotel.policy}
                    &nbsp; &nbsp;
                    {hotel.policy.length > policyLength && (
                        <button
                            className="text-blue-500 outline-none"
                            onClick={changeread}>
                            {readmore ? "ReadLess" : "ReadMore"}
                        </button>
                    )}
                </div>

                <div className="text-gray-600 text-sm">
                    <span className="text-gray-700 font-semibold">
                        Contact :
                    </span>{" "}
                    {hotel.contact}
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
            <Carousal
                control={controlCarousal}
                images={hotel.photos}
                title={hotel.name}
            />
        </div>
    );
}
