import React, { useState, useRef, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

function Maps({ mark = null, onChange = () => null, markerDraggable = false }) {
    const [viewport, setViewport] = useState({
        center: { lat: 10.552621801948733, lng: 76.35498046875001 },
        zoom: 7,
    });
    const [marker, setMarker] = useState(viewport.center);

    useEffect(() => {
        if (mark.lat && mark.lng) {
            setMarker(mark);
            setViewport((prevViewport) => ({ ...prevViewport, center: mark }));
        }
    }, [mark]);

    const refMarker = useRef();

    function updatePosition() {
        const markerPos = refMarker.current;
        if (markerPos != null) {
            setMarker(markerPos.leafletElement.getLatLng());
            onChange(markerPos.leafletElement.getLatLng());
        }
    }

    function handleViewportChanged(e) {
        setViewport(e);
    }

    return (
        <Map
            className="w-full h-full"
            viewport={viewport}
            onViewportChanged={handleViewportChanged}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mark.lat && mark.lng && (
                <Marker
                    draggable={markerDraggable}
                    onDragend={updatePosition}
                    position={marker}
                    ref={refMarker}>
                    <Popup minWidth={90}>
                        <span>Hotel Location</span>
                    </Popup>
                </Marker>
            )}
        </Map>
    );
}

export default Maps;
