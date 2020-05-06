import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "hookrouter";
import { getUserHotelList, getAllHotelsList } from "../../Redux/actions";
import ActionsBox from "./ActionsBox";
import HotelsList from "./HotelsList";
import FacilitatorInfo from "./FacilitatorInfo";
import { FullLoading } from "../common/Loader";
import { USER_TYPES } from "../../Common/constants";

export default function Facilitator({ from }) {
    const state = useSelector((reduxState) => reduxState);
    const { currentUser: temp } = state;
    const currentUser = temp && temp.data && temp.data.data;

    const dispatch = useDispatch();
    const userHotelList =
        currentUser.type === USER_TYPES.FACILITY_OWNER.type
            ? state.userHotelList
            : state.allHotelsList;

    useEffect(() => {
        if (from === "booking_page") {
            navigate("/");
        }
        window.scrollTo(0, 0);
        if (currentUser.type === USER_TYPES.FACILITY_OWNER.type) {
            dispatch(getUserHotelList());
        } else {
            dispatch(getAllHotelsList());
        }
    }, [dispatch, currentUser.id, from]);

    if (!userHotelList || userHotelList.isFetching) {
        return <FullLoading />;
    }
    if (userHotelList.error) {
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden">
                <div className="text-5xl text-gray-400">
                    Some problem occured, please try again
                </div>
            </div>
        );
    }
    const hotelList =
        userHotelList.data &&
        (currentUser.type === USER_TYPES.FACILITY_OWNER.type
            ? userHotelList.data.data &&
              Object.values(userHotelList.data.data).filter((e) => e)
            : userHotelList.data);

    const buttons =
        currentUser.type === USER_TYPES.FACILITY_OWNER.type
            ? [{ link: "/hotel/add", text: "Add Hotel" }]
            : [];

    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            <div className="flex-col flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                <div className="mb-6 md:mx-0 mx-2">
                    <FacilitatorInfo
                        currentUser={currentUser}
                        hotelCount={Object.values(hotelList).length}
                    />
                </div>

                <div className="w-full mb-6">
                    <ActionsBox buttons={buttons} />
                </div>

                <div className="flex w-full mb-6 flex flex-col">
                    <HotelsList
                        hotelList={hotelList}
                        isAdmin={
                            currentUser.type === USER_TYPES.FACILITY_OWNER.type
                        }
                    />
                </div>
            </div>
        </div>
    );
}
