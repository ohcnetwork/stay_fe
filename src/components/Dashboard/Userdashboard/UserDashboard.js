import React, { useEffect } from "react";
import { A } from "hookrouter";
import { useSelector } from "react-redux";
import { DEFAULT_IMAGE } from "../../../Common/constants";

function UserDashboard() {
    const state = useSelector((reduxState) => reduxState);
    const { currentUser } = state;
    const user = currentUser.data.data;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    if (user.image == null) {
        user.image = DEFAULT_IMAGE.USER;
    }
    return (
        <div className="mt-10">
            <div className="bg-gray-100 shadow py-4 px-3 lg:w-1/2 w-3/4 m-0 m-auto sm:max-w-full max-w-md rounded overflow-hidden">
                <A
                    href="/edit"
                    className="bg-blue-500  hover:bg-blue-700 px-5 py-2 text-white font-bold h-2 w-full rounded-full">
                    Edit data
                </A>
                <div className="text-center p-6">
                    <img
                        className="h-40 w-40 rounded-full mx-auto"
                        src={user.image}
                        alt="User Default"
                    />
                    <p className="pt-2 text-xl font-semibold">{user.name}</p>
                    <p className="text-lg text-gray-800">{user.email}</p>
                    <p className="text-lg text-gray-800">{user.mobno}</p>
                    <div className="mt-5">
                        <A
                            href="/history"
                            className="bg-white hover:bg-blue-500 text-blue-700 font-semibold mt-6 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Booking history
                        </A>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
