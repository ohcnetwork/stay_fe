import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { A } from "hookrouter";

import { getUserHotelList, getHotelRoomList } from "../../Redux/actions";
import DeleteConfirmation from "./DeleteConfirmation";
import ActionsBox from "./ActionsBox";
import HotelInfo from "../Hotel/HotelInfo";
import RoomsList from "../Room/RoomsList";
import HotelLocation from "../Hotel/HotelLocation";
import { FullLoading } from "../common/Loader";

export default function FacilitatorViewHotel({ id }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const state = useSelector((reduxState) => reduxState);
    const { currentUser: temp } = state;
    const currentUser = temp && temp.data && temp.data.data;

    const dispatch = useDispatch();
    const { userHotelList } = state;
    const { hotelRoomList } = state;

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getUserHotelList());
        dispatch(getHotelRoomList(id));
    }, [dispatch, id]);

    // check if loading
    if (
        !userHotelList ||
        userHotelList.isFetching ||
        !hotelRoomList ||
        hotelRoomList.isFetching
    ) {
        return <FullLoading />;
    }

    if (userHotelList.error || hotelRoomList.error) {
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden">
                <div className="text-5xl text-gray-400">
                    Some problem occured, please try again
                </div>
            </div>
        );
    }

    const currentHotel =
        userHotelList.data &&
        userHotelList.data.data &&
        Object.values(userHotelList.data.data).find((el) => el.id === id);

    // check if the hotel actually exists
    // and if this user is the owner
    if (!currentHotel) {
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden">
                <div className="text-5xl text-gray-400">
                    Hotel was not found
                </div>
                <A
                    href="/"
                    className="flex items-center text-xl m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                    Home
                </A>
            </div>
        );
    }

    function toggleConfirmation() {
        setShowConfirmation(!showConfirmation);
    }

    const hotelRoomData = (hotelRoomList.data && hotelRoomList.data.data) || [];

    const buttons = [
        { link: `/hotel/${currentHotel.id}/bookings`, text: "View Bookings" },
        { link: `/hotel/${currentHotel.id}/room/add`, text: "Add Rooms" },
        { link: `/hotel/${currentHotel.id}/edit`, text: "Edit Hotel" },
        { action: toggleConfirmation, text: "Delete Hotel" },
    ];

    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            <div className="flex-col flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                <div className="mb-6 md:mx-0 mx-2">
                    <HotelInfo data={currentHotel} />
                </div>

                <div className="w-full mb-6">
                    <ActionsBox buttons={buttons} labels={["owner"]} />
                </div>

                <div className="mb-6 md:mx-0 mx-2">
                    <HotelLocation
                        markerLabel={currentHotel.name}
                        location={{
                            lat: currentHotel.latitude,
                            lng: currentHotel.longitude,
                        }}
                    />
                </div>

                <div className="w-full mb-6">
                    <RoomsList data={hotelRoomData} hotelId={id} />
                </div>
            </div>
            <DeleteConfirmation
                show={showConfirmation}
                toggle={toggleConfirmation}
                name={currentHotel.name}
                id={currentHotel.id}
                rooms={hotelRoomData.length}
            />
        </div>
    );
}
