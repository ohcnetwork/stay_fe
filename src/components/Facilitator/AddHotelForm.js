import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postAddHotel } from "../../Redux/actions";
import * as Notficiation from "../../util/Notifications";
import { navigate } from "hookrouter";
import { DISTRICT_CHOICES } from "../../Common/constants";
import HotelForm from "./HotelForm";

export default function AddHotelForm() {
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const initForm = {
        name: "",
        address: "",
        panchayath: "",
        district: DISTRICT_CHOICES[0].text,
        starCategory: null,
        latitude: "",
        longitude: "",
        facilities: null,
        contact: "",
        policy: "",
    };

    const initFacilities = {
        pool: false,
        wifi: false,
        parking: false,
        cctv: false,
    };

    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(false);

    const handleSubmit = (form) => {
        setFormLoading(true);

        dispatch(postAddHotel(form)).then((resp) => {
            const { status: statusCode } = resp;
            const { data: res } = resp;

            // set captha logic needed
            if (res && statusCode === 201) {
                Notficiation.Success({
                    msg: "Hotel Created, Add Room Details",
                });
                navigate(`${res.id}/room/add `);
                // navigate(`${res.data.id}/room/add `);
            } else {
                setFormError("Some problem occurred");
                setFormLoading(false);
            }
        });
    };

    return (
        <div className="h-full overflow-x-hidden flex items-center justify-center">
            <HotelForm
                initForm={initForm}
                initFacilities={initFacilities}
                formLoading={formLoading}
                formError={formError}
                submit={handleSubmit}
            />
        </div>
    );
}
