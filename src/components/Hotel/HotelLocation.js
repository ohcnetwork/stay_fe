import React, { useState, useEffect } from "react";
import Maps from "../Map/Maps";

export default function HotelLocation({
    markerLabel,
    location = { lat: null, lng: null },
}) {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (location) {
            setPosition(location);
        }
    }, [location]);

    if (!position) {
        return null;
    }

    const mapLink =
        "https://www.google.com/maps/search/?api=1&query=" +
        position.lat +
        "," +
        position.lng;

    return (
        <div className="flex-grow flex flex-col bg-white md:mx-0 mx-2 rounded shadow overflow-x-hidden">
            <div className="border-b">
                <div className="flex justify-between px-6 -mb-px">
                    <h3 className="text-gray-900 py-4 font-normal text-lg">
                        Location
                    </h3>
                </div>
            </div>
            <div className="p-5 flex flex-col justify-center">
                <div className="h-64 w-full bg-gray-200">
                    <Maps mark={position} markerLabel={markerLabel} />
                </div>
                <div className="flex justify-end mt-2">
                    <a
                        className="bg-indigo-700 text-white px-2 py-2 rounded hover:bg-indigo-800 font-medium flex justify-center items-center"
                        href={mapLink}
                        rel="noopener noreferrer"   
                        target="_blank">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="location-arrow"
                            className="h-5 w-5 mr-2 svg-inline--fa fa-location-arrow fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path>
                        </svg>
                        <div>Open in Google Maps</div>
                    </a>
                </div>
            </div>
        </div>
    );
}
