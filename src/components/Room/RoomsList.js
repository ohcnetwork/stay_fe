import React, { useState, useEffect } from "react";
import RoomContainer from "./RoomContainer";

export default function RoomsList({ data, linkSuffix = "", hotelId = "" }) {
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        setRooms(data);
    }, [data]);
    function listRooms(currentRooms) {
        // categorize rooms based on all parameters except id
        currentRooms = [
            ...new Set(
                currentRooms.map((e) => JSON.stringify({ ...e, id: "" }))
            ),
        ].map((e) =>
            currentRooms.filter((el) => JSON.stringify({ ...el, id: "" }) === e)
        );
        if (currentRooms.length > 0) {
            return currentRooms.map((room) => {
                const r = room[0];
                r.link = linkSuffix && `/room/${r.category}${linkSuffix}`;
                return (
                    <RoomContainer
                        key={r.title}
                        r={r}
                        ids={room.map((el) => el.id)}
                        count={room.length}
                        hotelId={hotelId}
                    />
                );
            });
        } else {
            return (
                <div className="text-gray-500 py-8 text-center text-xl w-full">
                    No rooms currently available
                </div>
            );
        }
    }

    if (!rooms) {
        return null;
    }

    return (
        <div className="flex-grow flex flex-col bg-white md:mx-0 mx-2 rounded shadow overflow-x-hidden">
            <div className="border-b">
                <div className="flex justify-between px-6 -mb-px">
                    <h3 className="text-gray-900 py-4 font-normal text-lg">
                        Rooms
                    </h3>
                </div>
            </div>
            <div className="p-5 flex flex-wrap justify-center md:justify-start">
                {listRooms(data)}
            </div>
        </div>
    );
}
