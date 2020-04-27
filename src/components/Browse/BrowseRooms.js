import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getHotelList, getHotelByHotelId } from "../../Redux/actions";
import { navigate } from "hookrouter";
import HotelInfo from "../Hotel/HotelInfo";
import RoomsList from "../Room/RoomsList";

function BrowseRooms({ id, startdate, enddate }) {
    const dates = {
        checkin: startdate,
        checkout: enddate,
    };
    const [sortedrooms, setsortedrooms] = useState(false);
    const [currenthotel, setcurrenthotel] = useState(false);
    // const [errflag, seterrflag] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            isNaN(new Date(startdate).getTime()) ||
            isNaN(new Date(enddate).getTime()) ||
            isNaN(id)
        ) {
            navigate("/browse");
        } else {
            dispatch(getHotelByHotelId(id)).then((res) => {
                setcurrenthotel(res.data);
            });
            const body = {
                hotelid: id,
                checkin: dates.checkin,
                checkout: dates.checkout,
                type: "room",
            };
            dispatch(getHotelList(body)).then((res) => {
                if (res) {
                    setsortedrooms(res.data);
                }
                // } else {
                //     seterrflag(true);
                // }
            });
        }
    }, []);

    if (sortedrooms && { sortedrooms } === null) {
        return (
            <div className="empty-search">
                <h3>unfortunately no rooms available in this hotel...!</h3>
            </div>
        );
    }
    return (
        <div className="font-sans bg-gray-200 flex flex-col w-full min-h-screen overflow-x-hidden">
            <div className="flex-col flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                <div className="mb-6 md:mx-0 mx-2">
                    <HotelInfo data={currenthotel} />
                </div>

                <div className="w-full mb-6">
                    <RoomsList
                        data={sortedrooms}
                        linkSuffix={`/${id}/${dates.checkin}/${dates.checkout}`}
                    />
                </div>
            </div>
        </div>
    );
}
export default BrowseRooms;
