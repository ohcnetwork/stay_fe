import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { navigate, A } from "hookrouter";

import * as Notification from "../../util/Notifications";
import { deleteHotel } from "../../Redux/actions";

export default function DeleteConfirmation({ show, booked, name, toggle, id, rooms }) {

    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    function del() {
        dispatch(deleteHotel(id)).then(res => {
            console.log(res);
            setError(false);
            if (res.status === 200) {
                Notification.Success({
                    msg: `Deleted ${name}`
                })
                navigate("/");
            } else {
                setError(true);
            }
        });
        return false;
    }

    return (
        <div className={`${show? "flex": "hidden"} fixed top-0 left-0 bg-gray-200 h-screen w-full items-center justify-center`}>
            <div className="pb-8 px-0 md:w-1/2 bg-white shadow-lg mx-5 rounded">
                <div className="uppercase bg-red-700 pt-3 px-5 pb-2 text-lg text-white font-bold tracking-wide rounded-t">Delete Hotel</div>
                <div className="px-5">
                    <div className="pb-8 pt-3 px-0 text-gray-800">
                        You are about to delete the hotel <span className="font-medium">{name}</span> with <span className="font-medium">{booked} booking{booked === 1? "": "s"}</span> and <span className="font-medium">{rooms} room{rooms === 1? "": "s"}</span>. If you just want to change information, go to edit.
                        If you are sure then click delete.
                    </div>
                    {error && <div className="text-sm text-red-700 font-medium">Something went wrong please. Try again.</div>}
                    <div className="flex justify-between font-bold tracking-wide">
                        <div className="flex"  onClick={toggle}>
                            <div className="flex items-center justify-center p-2 px-3 md:px-6 rounded bg-gray-300  hover:bg-gray-400 cursor-pointer">
                                Back
                            </div>
                        </div>
                        <div className="flex text-white">
                            <A href="#" className="flex items-center justify-center p-2 px-3 md:px-6 rounded mr-2 bg-indigo-600 hover:bg-indigo-800 cursor-pointer">
                                Edit
                            </A>
                            <div onClick={del} className="flex items-center justify-center rounded p-2 px-3 md:px-6 bg-red-700 hover:bg-red-800 cursor-pointer">
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}