import React, { useState, useEffect } from "react";
import GeoSearch from "./GeoSearch";
import Maps from "./Maps";

export default function MapWithSearch({
    onChange = () => null,
    value = null,
    markerDraggable = false,
}) {
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
            <div className="relative z-10">
                <GeoSearch onChange={changeHandler} />
            </div>
            <div className="flex-grow">
                <Maps
                    onChange={changeHandler}
                    mark={location}
                    markerDraggable={markerDraggable}
                />
            </div>
        </div>
    );
}
