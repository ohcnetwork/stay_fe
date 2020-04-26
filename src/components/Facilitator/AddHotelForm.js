import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAddHotel } from "../../Redux/actions";
import * as Notficiation from "../../util/Notifications";
import { navigate } from "hookrouter";
import { DISTRICT_CHOICES } from "../../Common/constants";
import HotelForm from "./HotelForm";

export default function AddHotelForm() {
    const dispatch = useDispatch();

    const initForm = {
        name: "",
        address: "",
        panchayath: "",
        district: DISTRICT_CHOICES[0].text,
        starCategory: null,
        latitude: "11.1",
        longitude: "2.1",
        facilities: null,
        photos: "photos",
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

    const handleSubmit = (formData) => {
        setFormLoading(true);

        // const formData = new FormData();
        // Object.keys(form).forEach((key) => {
        //     if (key === "file") {
        //         form[key].forEach((el) => {
        //             formData.append(key, el);
        //         });
        //     } else {
        //         formData.append(key, form[key]);
        //     }
        // });

        dispatch(postAddHotel(formData)).then((resp) => {
            const { status: statusCode } = resp;
            const { data: res } = resp;

            // set captha logic needed
            if (res && statusCode === 201) {
                Notficiation.Success({
                    msg: "Hotel Created, Add Room Details",
                });
                // navigate(`${res.id}/room/add `);
                navigate(`${res.data.id}/room/add `);
            } else {
                setFormError("Some problem occurred");
                setFormLoading(false);
            }
        });
    };

    return (
        <div className="h-full overflow-x-hidden flex items-center justify-center bg-gray-400">
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
