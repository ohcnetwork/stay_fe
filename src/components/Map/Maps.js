import React, { useState, useRef, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

function Maps({ mark = null, onChange = () => null }) {
    const center = { lat: 10.552621801948733, lng: 76.35498046875001 };
    const [marker, setMarker] = useState(center);
    const zoom = 7;

    useEffect(() => {
        if (mark) {
            setMarker(mark);
        }
    }, [mark]);

    const refMarker = useRef();

    const updatePosition = () => {
        const markerPos = refMarker.current;
        if (markerPos != null) {
            setMarker(markerPos.leafletElement.getLatLng());
        }
        onChange(markerPos.leafletElement.getLatLng());
    };
    return (
        <Map className="w-full h-full" center={center} zoom={zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                draggable={true}
                onDragend={updatePosition}
                position={marker}
                ref={refMarker}>
                <Popup minWidth={90}>
                    <span>Hotel Location</span>
                </Popup>
            </Marker>
        </Map>
    );
}

export default Maps;
