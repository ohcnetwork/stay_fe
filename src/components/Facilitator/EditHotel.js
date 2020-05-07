import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHotel, getUserHotelList } from "../../Redux/actions";
import * as Notficiation from "../../util/Notifications";
import { navigate, A } from "hookrouter";
import HotelForm from "./HotelForm";
import { FullLoading } from "../common/Loader";

export default function EditHotel({ id }) {
    const dispatch = useDispatch();

    const state = useSelector((reduxState) => reduxState);
    const { currentUser: temp } = state;
    const currentUser = temp && temp.data && temp.data.data;
    const { userHotelList } = state;
    //const [submt , setsubmit] = useState

    const initForm = {
        name: "",
        address: "",
        panchayath: "",
        district: "",
        starCategory: "",
        latitude: "",
        longitude: "",
        facilities: "",
        contact: "",
        policy: "",
    };

    const initFacilities = {
        parking: false,
        wifi: false,
        pool: false,
        cctv: false,
    };

    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(false);

    const currentHotel =
        userHotelList &&
        userHotelList.data &&
        userHotelList.data.data &&
        Object.values(userHotelList.data.data).find((el) => el.id === id);
  
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getUserHotelList());
    }, [id]);

    function handleSubmit(form) {
        console.log(form);
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
            if (key === "file") {
                form[key].forEach((el) => {
                    formData.append(key, el);
                });
            } else {
                formData.append(key, form[key]);
            }
        });
        setFormLoading(true);
        dispatch(updateHotel([id, "update-Facility"], formData)).then(
            (resp) => {
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
            }
        );
    }

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

    // check if the hotel actually exists
    // and if this user is the owner
    if (!currentHotel || currentHotel.ownerID !== currentUser.id) {
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

    let currentForm = Object.assign({}, initForm);
    Object.keys(currentForm).forEach((el) => {
        currentForm[el] = currentHotel[el];
    });
    let currentFacilities = Object.assign({}, initFacilities);
    currentHotel.facilities &&
        currentHotel.facilities.split(",").forEach((el) => {
            currentFacilities[el] = true;
        });
    const facilities = currentFacilities;
    const form = currentForm;

    return (
        <div className="overflow-x-hidden flex items-center justify-center">
            <HotelForm
                initForm={form}
                initFacilities={facilities}
                formLoading={formLoading}
                formError={formError}
                uploadOff={false}
                submit={handleSubmit}
            />
        </div>
    );
}
