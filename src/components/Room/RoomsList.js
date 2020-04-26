import React, { useState, useEffect } from "react";
import RoomContainer from "./RoomContainer";

export default function RoomList({ data, linkSuffix = "" }) {
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
        setRooms(data);
    }, [data]);

    function listRooms(rooms) {
        // categorize rooms based on all parameters except id
        rooms = [
            ...new Set(rooms.map((e) => JSON.stringify({ ...e, id: "" }))),
        ].map((e) =>
            rooms.filter((el) => JSON.stringify({ ...el, id: "" }) === e)
        );
        if (rooms.length > 0) {
            return rooms.map((room) => {
                const r = room[0];
                r.link =
                    linkSuffix && `/room/${r.category}${linkSuffix}`;
                return (
                    <RoomContainer key={r.title} r={r} count={room.length} />
                );
            });
        } else {
            return (
                <div className="text-gray-500 py-8 text-center text-xl w-full">
                    You currently have no rooms
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
