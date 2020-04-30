import React from "react";

export default function CancelConfirmation({ Shown , Sure, toggle , CancelSured }) {
    function Cancel() {
        CancelSured(Sure);
        toggle(Shown);
    }
    function back(){
        toggle(Shown);
    }

    return (
        <div
            className={`${
                !Shown ? "flex" : "hidden"
            } fixed top-0 left-0 bg-gray-200 h-screen w-full items-center justify-center`}>
            <div className="pb-8 px-0 md:w-1/2 lg:w-1/4 bg-white shadow-lg mx-5 rounded">
                <div className="uppercase bg-red-700 pt-3 px-5 pb-2 text-lg text-white font-bold tracking-wide rounded-t">
                    Cancel Booking
                </div>
                <div className="px-5">
                    <div className="pb-8 pt-3 px-0 text-gray-800">
                        You are about to Cancel the booking
                    </div>
                    <div className="flex justify-between font-bold tracking-wide">
                        <div className="flex" >
                            <div onClick={back} className="flex items-center justify-center p-2 px-3 md:px-6 rounded bg-gray-300  hover:bg-gray-400 cursor-pointer">
                                Back
                            </div>
                        </div>
                        <div className="flex text-white">
                            <div
                                onClick={Cancel}
                                className="flex items-center justify-center rounded p-2 px-3 md:px-6 bg-red-700 hover:bg-red-800 cursor-pointer">
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
