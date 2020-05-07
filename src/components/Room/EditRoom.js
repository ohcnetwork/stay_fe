import React, { useState, useEffect } from "react";
import RoomForm from "./RoomForm";
import { useDispatch, useSelector } from "react-redux";
import {
    postAddRooms,
    getUserHotelList,
    getHotelRoomList,
} from "../../Redux/actions";
import * as Notficiation from "../../util/Notifications";
import { navigate, A } from "hookrouter";
import { getRoomDetails, setRoomDetails } from "../../util/helperFunctions";
import { BED_COUNT } from "../../Common/constants";
import { FullLoading } from "../common/Loader";

export default function EditRoom({ id }) {
    const dispatch = useDispatch();

    const state = useSelector((reduxState) => reduxState);
    const { currentUser: temp } = state;
    const currentUser = temp && temp.data && temp.data.data;
    const { userHotelList } = state;
    const { hotelRoomList } = state;

    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(false);
    const initForm = {
        title: "",
        features: null,
        description: "",
        category: "",
        beds: BED_COUNT[0].text,
        cost: "",
        file: [],
    };
    const [currentRoom, setCurrentRoom] = useState("'");
    const initFeatures = {
        ac: false,
        wifi: false,
        mini_fridge: false,
        geyser: false,
    };

    const currentHotel =
        userHotelList &&
        userHotelList.data &&
        userHotelList.data.data &&
        Object.values(userHotelList.data.data).find((el) => el.id === id);

    useEffect(() => {
        const room = getRoomDetails();
        if (!room) {
            navigate(`/hotel/${id}`);
        } else {
            setCurrentRoom(room);
        }
        dispatch(getUserHotelList());
        dispatch(getHotelRoomList(id));
    }, [id]);

    function onSubmit(form) {
        form.append(
            "ids",
            currentHotelRooms.map((el) => el.id)
        );

        setFormLoading(true);
        console.log("submit form");
        dispatch(postAddRooms(id, form)).then((resp) => {
            const { status: statusCode } = resp;
            const { data: res } = resp;

            // set captha logic needed
            if (res && statusCode === 201) {
                Notficiation.Success({
                    msg: "Room Created",
                });
                navigate(`/hotel/${id}`);
                setRoomDetails(null, true);
            } else {
                let formErr = "Some problem occurred";

                setFormError(formErr);
                setFormLoading(false);
            }
        });
    }

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

    const currentHotelRooms =
        hotelRoomList.data &&
        hotelRoomList.data.data &&
        hotelRoomList.data.data.filter(
            (el) =>
                JSON.stringify({ ...el, id: "" }) ===
                JSON.stringify({ ...currentRoom, id: "" })
        );

    // check if the hotel actually exists
    // and if this user is the owner
    if (
        !currentHotel ||
        currentHotel.ownerID !== currentUser.id ||
        !currentHotelRooms
    ) {
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden">
                <div className="text-5xl text-gray-400">
                    Rooms were not found
                </div>
                <A
                    href="/"
                    className="flex items-center text-xl m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                    Home
                </A>
            </div>
        );
    }

    let currentForm = Object.assign({}, initForm);
    Object.keys(currentForm).forEach((el) => {
        currentForm[el] = currentRoom[el];
    });
    currentForm.file = [];

    let currentFeatures = Object.assign({}, initFeatures);
    currentRoom.features &&
        currentRoom.features.split(",").forEach((el) => {
            currentFeatures[el] = true;
        });
    const features = currentFeatures;
    const form = currentForm;

    return (
        <RoomForm
            initForm={form}
            onSubmit={onSubmit}
            formLoading={formLoading}
            formError={formError}
            initFeatures={features}
            count={currentHotelRooms.length}
            editMode={true}
        />
    );
}
