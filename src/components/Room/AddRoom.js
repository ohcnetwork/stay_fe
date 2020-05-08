import React, { useState } from "react";
import RoomForm from "./RoomForm";
import { useDispatch } from "react-redux";
import { postAddRooms } from "../../Redux/actions";
import * as Notficiation from "../../util/Notifications";
import { navigate } from "hookrouter";
import { BED_COUNT } from "../../Common/constants";

export default function AddRoom({ id }) {
    const dispatch = useDispatch();

    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(false);
    const initForm = {
        title: "",
        features: null,
        description: "",
        category: "",
        beds: BED_COUNT[0].text,
        noOfRooms: "",
        cost: "",
        file: [],
    };
    const initFeatures = {
        ac: false,
        wifi: false,
        mini_fridge: false,
        geyser: false,
    };

    function onSubmit(form) {
        setFormLoading(true);
        dispatch(postAddRooms(id, form)).then((resp) => {
            const { status: statusCode } = resp;
            const { data: res } = resp;

            // set captha logic needed
            if (res && statusCode === 201) {
                Notficiation.Success({
                    msg: "Room Created",
                });
                navigate(`/hotel/${id}`);
            } else {
                let formErr = "Some problem occurred";

                setFormError(formErr);
                setFormLoading(false);
            }
        });
    }

    return (
        <RoomForm
            initForm={initForm}
            onSubmit={onSubmit}
            formLoading={formLoading}
            formError={formError}
            initFeatures={initFeatures}
        />
    );
}
