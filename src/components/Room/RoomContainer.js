import React, { useState } from "react";
import { A } from "hookrouter";
import { DEFAULT_IMAGE } from "../../Common/constants";
import Carousal from "../common/Carousal";
import { setRoomDetails } from "../../util/helperFunctions";
import DeleteConfirmation from "./DeleteConfirmation";

export default function RoomContainer({
    r,
    count = null,
    hotelId = "",
    ids = [],
}) {
    function storeRoomDetails() {
        const body = Object.assign({}, r);
        delete body.link;
        setRoomDetails(body);
    }

    const previewImage = (r.photos && r.photos[0]) || DEFAULT_IMAGE.ROOM;
    const controlCarousal = useState(false);
    const controlDeletion = useState(false);

    return (
        <div className="md:w-1/2 lg:w-1/3 w-full">
            <div
                className={`${
                    r.link ? "hover:bg-gray-300 hover:shadow-lg" : ""
                } mx-5 my-5 bg-gray-200 rounded shadow-md `}>
                <A
                    onClick={storeRoomDetails}
                    key={r.title}
                    href={r.link || "#"}
                    className={`flex flex-col ${
                        r.link ? "" : "cursor-default"
                    }`}>
                    <div className="h-64">
                        <img
                            onClick={() =>
                                !r.link && r.photos.length >= 1
                                    ? controlCarousal[1](true)
                                    : null
                            }
                            alt={r.title}
                            className={`w-full h-full object-cover rounded ${
                                r.link || r.photos.length < 1
                                    ? ""
                                    : "cursor-pointer"
                            }`}
                            src={previewImage}
                        />
                    </div>
                    <div className="pt-3 px-3">
                        <div className="flex flex-wrap items-center justify-between py-1">
                            <div className="text-gray-800 text-lg uppercase font-medium py-1 truncate">
                                {r.title}
                            </div>
                            <div className="flex items-center">
                                <div className="text-xs px-2 bg-black text-white font-bold uppercase tracking-wide text-center">
                                    {r.category}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap pb-3">
                            {(r.features || "").split(",").map((el) => (
                                <div
                                    key={el}
                                    className="text-xs text-gray-900 mr-2 bg-gray-400 px-2 rounded tracking-wide uppercase">
                                    {el.replace("_", " ")}
                                </div>
                            ))}
                        </div>
                        <div className="text-gray-600 pb h-32 overflow-hidden text-sm">
                            {r.description}
                        </div>
                        <div className="flex flex-wrap items-center justify-between border-b pb-3">
                            <div className="text-gray-800">Beds: {r.beds}</div>
                            <div className="flex items-center ml-2">
                                <div className="text-2xl text-gray-900 font-bold tracking-wide flex">
                                    <svg
                                        className="w-4 h-4 mt-2 fill-current"
                                        viewBox="39.5 -0.5 169.756 250">
                                        <path d="M152.511,23.119h41.031L209.256-0.5H55.214L39.5,23.119h26.739c27.086,0,52.084,2.092,62.081,24.743H55.214 L39.5,71.482h91.769c-0.002,0.053-0.002,0.102-0.002,0.155c0,16.974-14.106,43.01-60.685,43.01l-22.537-0.026l0.025,22.068 L138.329,249.5h40.195l-93.42-116.709c38.456-2.074,74.523-23.563,79.722-61.309h28.716l15.714-23.62h-44.84 C162.606,38.761,158.674,29.958,152.511,23.119z" />
                                    </svg>
                                    {r.cost}
                                </div>
                            </div>
                        </div>
                    </div>
                </A>
                <div className="flex flex-wrap items-center justify-between py-3 px-3">
                    <div className="text-gray-800 font-medium py-2">
                        Rooms Available: {count}
                    </div>
                    {hotelId && (
                        <div className="flex py-2">
                            <A
                                onClick={storeRoomDetails}
                                href={`/hotel/${hotelId}/room/edit`}
                                className="bg-indigo-600 hover:bg-indigo-800 rounded px-3 py-1 mx-1 font-medium text-white">
                                Edit
                            </A>
                            <div
                                onClick={() => controlDeletion[1](true)}
                                className="bg-red-700 hover:bg-red-800 rounded px-3 py-1 mx-1 font-medium text-white cursor-pointer">
                                Delete
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {
                <DeleteConfirmation
                    control={controlDeletion}
                    ids={ids}
                    name={r.title}
                    hotelId={hotelId}
                />
            }
            <Carousal
                control={controlCarousal}
                images={r.photos}
                title={r.title}
            />
        </div>
    );
}
