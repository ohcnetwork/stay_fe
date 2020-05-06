import React from "react";

export default function FacilitatorInfo({ currentUser, hotelCount = 0 }) {
    const months = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
    ];
    const accountCreation = new Date(currentUser.createdAt);

    function timeString(tme) {
        let hours = tme.getHours() % 12;
        hours = (hours < 10 ? "0" : "") + hours;
        let minutes = tme.getMinutes();
        minutes = (minutes < 10 ? "0" : "") + minutes;
        const suffix = hours % 12 < 1 ? "AM" : "PM";

        return `${hours}:${minutes} ${suffix}`;
    }

    return (
        <div className="bg-white border-t border-b sm:rounded shadow">
            <div className="border-b px-6 py-2">
                <div className="flex md:justify-between justify-around -mb-px py-1 flex-col md:flex-row">
                    <div className="flex flex-col">
                        <div className="uppercase text-3xl text-center md:text-left text-gray-800">
                            {currentUser.name}
                        </div>
                        <div className="text-center md:text-left text-gray-600 truncate">
                            {currentUser.email}
                        </div>
                    </div>
                    <div className="flex items-center justify-center md:pt-0 pt-5">
                        <div className="flex items-center ">
                            <div className="items-center text-sm py-1 px-2 bg-green-600 text-white font-bold uppercase tracking-wide">
                                {currentUser.type}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex md:flex-row flex-col">
                <div className="md:w-1/3 text-center py-8">
                    <div className="border-r">
                        <div className="text-gray-800 mb-2">
                            <span className="text-5xl">{hotelCount}</span>
                        </div>
                        <div className="text-sm uppercase text-gray-600 tracking-wide">
                            Hotels
                        </div>
                    </div>
                </div>
                <div className="md:w-1/3 text-center py-8">
                    <div className="border-r">
                        <div className="text-gray-800 mb-2">
                            <span className="text-5xl uppercase">
                                {currentUser.status}
                            </span>
                        </div>
                        <div className="text-sm uppercase text-gray-600 tracking-wide">
                            Account Status
                        </div>
                    </div>
                </div>
                <div className="md:w-1/3 text-center py-8">
                    <div className="border-r">
                        <div className="text-gray-800 mb-2">
                            <div className="text-2xl uppercase">
                                {accountCreation.getDate()}{" "}
                                {months[accountCreation.getMonth()]}
                            </div>
                            <div className="text-2xl uppercase">
                                {timeString(accountCreation)}
                            </div>
                        </div>
                        <div className="text-sm uppercase text-gray-600 tracking-wide">
                            Created On
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
