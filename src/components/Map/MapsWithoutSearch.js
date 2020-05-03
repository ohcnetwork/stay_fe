import React, { useState, useEffect } from "react";
import Maps from "./Maps";

export default function MapWithSearch({
    onChange = () => null,
    value = null,
    markerDraggable = false,
    hotel_latitude,
    hotel_longitude,
}) {
    value.lat = hotel_latitude;
    value.lng = hotel_longitude;
    const [location, setLocation] = useState(value);

    useEffect(() => {
        setLocation(value);
    }, [value]);

    function changeHandler(e) {
        setLocation(e);
        const { lat, lng } = e;
        onChange({ lat, lng });
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-grow relative z-0">
                <Maps
                    onChange={changeHandler}
                    mark={location}
                    markerDraggable={markerDraggable}
                />
            </div>
        </div>
    );
}
