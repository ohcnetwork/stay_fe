import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateHotel, getUserHotelList } from "../../Redux/actions";
import * as Notficiation from "../../util/Notifications";
import { navigate, A } from "hookrouter";
import HotelForm from "./HotelForm";

export default function EditHotel({ id }) {

    const dispatch = useDispatch();

    const state = useSelector(state => state);
    const { currentUser: temp } = state;
    const currentUser = temp && temp.data && temp.data.data;
    const { userHotelList } = state;

    const initForm = {
        name: "",
        address: "",
        panchayath: "",
        district: "",
        starCategory: "",
        latitude: "11.1",
        longitude: "2.1",
        facilities: "",
        contact: "",
        policy: "",
    };

    const initFacilities = {
        parking: false,
        wifi: false,
        pool: false,
        cctv: false
    };

    const [formLoading, setFormLoading] = useState(false);
    const [form, setForm] = useState(initForm);
    const [facilities, setFacilitites] = useState({
        pool: false,
        wifi: false,
        parking: false,
        cctv: false
    });
    const [formError, setFormError] = useState(false);

    const currentHotel = userHotelList && userHotelList.data && userHotelList.data.data && Object.values(userHotelList.data.data).find(el => el.id === id);

    useEffect(() => {
        dispatch(getUserHotelList());
    }, [dispatch]);

    useEffect(() => {
        if (currentHotel) {
            let currentForm = Object.assign({}, initForm);
            Object.keys(currentForm).forEach(el => {
                currentForm[el] = currentHotel[el];
            });
            let currentFacilities = Object.assign({}, initFacilities);
            currentHotel.facilities.split(",").forEach(el => {
                currentFacilities[el] = true;
            });
            setForm(currentForm);
            setFacilitites(currentFacilities);
        }
    }, [currentHotel, initFacilities, initForm])


    function handleSubmit(formData) {
        setFormLoading(true);
        dispatch(updateHotel([id, "update-Facility"], formData)).then((resp) => {
            const { status: statusCode } = resp;
            const { data: res } = resp;

            // set captha logic needed
            if (res && statusCode === 200 && res.success === true) {
                Notficiation.Success({
                    msg: "Hotel Updated",
                });
                navigate(`/hotel/${id}`);
            } else {
                setFormError("Some problem occurred");
                setFormLoading(false);
            }            
        });
    }

    if (!userHotelList || userHotelList.isFetching) {
        return <div className="lds-dual-ring h-screen w-screen items-center justify-center overflow-hidden flex"></div>
    }
    if (userHotelList.error) {
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden">
                <div className="text-5xl text-gray-400">Some problem occured, please try again</div>
            </div>
        );
    }

    // check if the hotel actually exists
    // and if this user is the owner
    if (!currentHotel || (currentHotel.ownerID !== currentUser.id)) {
        return (
            <div className="h-screen w-full items-center flex flex-col justify-center overflow-hidden">
                <div className="text-5xl text-gray-400">Hotel was not found</div>
                <A href="/" className="flex items-center text-xl m-5 py-3 px-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline">
                    Home
                </A>
            </div>
        );
    }

    return (
        <div className="overflow-x-hidden flex items-center justify-center">
            <HotelForm
                initForm={form}
                initFacilities={facilities}
                formLoading={formLoading}
                formError={formError}
                uploadOff={true}
                submit={handleSubmit} />
        </div>
    );
}