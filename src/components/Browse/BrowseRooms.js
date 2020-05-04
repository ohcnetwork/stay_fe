import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelList, getHotelByHotelId } from "../../Redux/actions";
import { A } from "hookrouter";
import { getAppliedFilters } from "../../util/helperFunctions";
import { FullLoading } from "../common/Loader";
import HotelInfo from "../Hotel/HotelInfo";
import HotelLocation from "../Hotel/HotelLocation";
import RoomsList from "../Room/RoomsList";

function BrowseRooms({ id }) {
    const dispatch = useDispatch();
    const state = useSelector((reduxState) => reduxState);
    const { hotelByHotelId, getHotelDetails } = state;
    let appliedFilters = getAppliedFilters(null, true);

    useEffect(() => {
        dispatch(getHotelByHotelId(id));

        // these filters are not acknoledged/invalid
        appliedFilters.district = "";

        // add page specific parameters
        let form = Object.assign({}, appliedFilters);
        form.type = "room";
        form.hotelid = id;
        dispatch(getHotelList(form));
    }, []);

    if (
        !hotelByHotelId ||
        hotelByHotelId.isFetching ||
        !getHotelDetails ||
        getHotelDetails.isFetching
    ) {
        return <FullLoading />;
    }

    if (!hotelByHotelId.data) {
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden bg-gray-200">
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

    console.log(hotelByHotelId);

    return (
        <div className="font-sans flex flex-col w-full overflow-x-hidden">
            <div className="flex-col flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                <div className="mb-6 md:mx-0 mx-2">
                    <HotelInfo data={hotelByHotelId.data} />
                </div>

                <div className="mb-6 md:mx-0 mx-2">
                    <HotelLocation
                        markerLabel={hotelByHotelId.data.name}
                        location={{
                            lat: hotelByHotelId.data.latitude,
                            lng: hotelByHotelId.data.longitude,
                        }}
                    />
                </div>

                <div className="w-full mb-6">
                    <RoomsList
                        data={getHotelDetails.data}
                        linkSuffix={`/${id}`}
                    />
                </div>
                <div className="mb-6 md:mx-0 mx-2 bg-white md:mx-0 mx-2 rounded shadow overflow-x-hidden">
                    <div className="text-gray-700 flex flex-col sm:flex-row py-4 text-sm">
                        <div className="text-black px-6 text-lg text-gray-900 flex items-center pb-2 border-b sm:border-none">
                            Applied filters:
                        </div>
                        <div className="flex flex-col items-center sm:pl-12 pt-2 sm:pt-0 sm:flex-grow">
                            <div className="">
                                {Object.keys(appliedFilters).map(
                                    (key) =>
                                        appliedFilters[key] !== "" && (
                                            <div className="" key={key}>
                                                <span className="capitalize">
                                                    {key}:{" "}
                                                </span>
                                                <span className="uppercase">
                                                    {appliedFilters[key]}
                                                </span>
                                            </div>
                                        )
                                )}
                            </div>
                        </div>
                        <div className="flex-grow flex items-center justify-center pt-5 sm:pt-0">
                            <A
                                className="text-white font-bold flex items-center justify-center p-2 px-3 md:px-6 rounded mr-2 bg-indigo-600 hover:bg-indigo-800"
                                href="/">
                                Change
                            </A>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BrowseRooms;
