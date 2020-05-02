import React, { useState } from "react";
import GeoSearch from "./GeoSearch";
import Maps from "./Maps";

export default function MapWithSearch({ onChange = () => null }) {
    const [location, setLocation] = useState(null);

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
            <div className="flex-grow relative z-0 h-64">
                <Maps onChange={changeHandler} mark={location} />
            </div>
        </div>
    );
}
