import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as Notification from "../../util/Notifications";
import { deleteRooms, getHotelRoomList } from "../../Redux/actions";

export default function DeleteConfirmation({ control, ids, name, hotelId }) {
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = control;
    const [count, setCount] = useState(1);

    function del() {
        setLoading(true);
        setError(false);
        if (count > 0 && count <= ids.length) {
            const body = { roomid: ids.slice(0, count) };
            dispatch(deleteRooms(body))
                .then((res) => {
                    if (res.status === 200) {
                        Notification.Success({
                            msg: `Deleted ${count} of ${name}`,
                        });
                    } else {
                        Notification.Error({
                            msg: "Specfied room could not be deleted",
                        });
                    }
                })
                .finally(() => {
                    dispatch(getHotelRoomList(hotelId));
                });
        } else {
            setError("Invalid number of rooms");
            setLoading(false);
        }
    }

    return (
        <div
            className={`${
                show ? "flex" : "hidden"
            } fixed top-0 left-0 bg-gray-200 h-screen w-full items-center justify-center z-10`}>
            <div className="pb-8 px-0 md:w-1/2 bg-white shadow-lg mx-5 rounded">
                <div className="uppercase bg-red-700 pt-3 px-5 pb-2 text-lg text-white font-bold tracking-wide rounded-t">
                    Delete Rooms
                </div>
                <div className="px-5">
                    <div className="pb-8 pt-3 px-0 text-gray-800">
                        You are about to delete the room{" "}
                        <span className="font-medium">{name}</span>. If you just
                        want to change information, go to back and edit. If you
                        are sure then click delete.
                        <div className="flex items-center flex-col pt-3">
                            <div className="">
                                Number of rooms to delete{" "}
                                <span className="text-sm text-gray-600">
                                    (max {ids.length})
                                </span>
                            </div>
                            <input
                                className={`w-16 py-3 rounded bg-gray-300 border text-xl text-center font-bold ${
                                    error ? "border-red-700" : ""
                                }`}
                                value={count}
                                onChange={(e) => setCount(e.target.value)}
                            />
                            {error && (
                                <div className="text-sm text-red-700">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between font-bold tracking-wide">
                        <div className="flex" onClick={() => setShow(false)}>
                            <div className="flex items-center justify-center p-2 px-3 md:px-6 rounded bg-gray-300  hover:bg-gray-400 cursor-pointer">
                                Back
                            </div>
                        </div>
                        <div className="flex text-white">
                            <div
                                onClick={del}
                                className={`flex items-center justify-center rounded p-2 px-3 md:px-6 ${
                                    loading
                                        ? "bg-gray-500"
                                        : "bg-red-700 hover:bg-red-800 cursor-pointer"
                                }`}>
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
