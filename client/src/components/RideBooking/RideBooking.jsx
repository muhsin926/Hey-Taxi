import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const RideBooking = () => {
    const position = [51.505, -0.09]
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popupp>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popupp>
            </Marker>
        </MapContainer>
    )
}

export default RideBooking