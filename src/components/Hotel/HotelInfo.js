import React, { useState, useEffect } from "react";
import { HOTEL_STATUS, DEFAULT_IMAGE } from "../../Common/constants";
import Carousal from "../common/Carousal";
import Star from "../common/Star";
import MapsWithoutSearch from "../Map/MapsWithoutSearch";
export default function HotelInfo({ data }) {
    const [hotel, setHotel] = useState(null);
    const controlCarousal = useState(false);
    const [form, setForm] = useState({});


    useEffect(() => {
        setHotel(data);
    }, [data]);

    if (!hotel) {
        return null;
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
            setForm({
                ...form,
                latitude: value.lat.toString(),
                longitude: value.lng.toString(),
            });
    };

    const previewImage =
        (hotel.photos && hotel.photos[0]) || DEFAULT_IMAGE.HOTEL;
    const MapLink  = "https://www.google.com/maps/search/?api=1&query="+hotel.latitude+","+hotel.longitude;
    console.log(MapLink);
    console.log(hotel);
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
                <div className="mt-2 lg:w-3/4 h-64 sm:h-50 w-full bg-gray-200">
                        <MapsWithoutSearch
                            markerDraggable={true}
                            hotel_latitude={hotel.latitude}
                            hotel_longitude={hotel.longitude}
                            value={{ lat: form.latitude, lng: form.longitude }}
                            onChange={(e) =>
                                handleChange({
                                    target: { name: "location", value: e },
                                })
                            }
                        />
                    </div>
                <div className="flex flex-row">
                <div>
                
                <div className="text-gray-600 text-sm">
                    Policy: {hotel.policy}
                </div>
                <div className="text-gray-600 text-sm">
                    Contact: {hotel.contact}
                </div>
                </div>
                <div>
                <button className="bg-blue-500 ml-5 w-3/4 text-xs text-white rounded ml-0 w-full shadow-lg hover:bg-blue-700 font-semibold mt-1  hover:text-white py-1 px-2 border"
                             onClick={() => window.open(MapLink , "_blank")}>
                            <div className="flex flex-row">
                            <img
                            className="h-8  "
                            src={DEFAULT_IMAGE.LOCATION}
                            alt="location"
                            ></img>
                            <div>
                            Open in Google Maps
                            </div>
                            </div>
                        </button>
                </div>
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
