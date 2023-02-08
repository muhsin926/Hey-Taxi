import React, { useEffect } from 'react'
import L from 'leaflet';
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRouting = () => {
    const map = useMap()
    useEffect(() => {
        L.Routing.control({
            waypoints: [
                L.latLng(57.74, 11.94),
                L.latLng(57.6792, 11.949)
            ],
            lineOptions: {
                styles: [
                  {
                    color: "blue",
                    weight: 4,
                    opacity: 0.7,
                  },
                ],
              },
              routeWhileDragging: false,
              geocoder:L.control.Geocoder.nominatim(),
              addWaypoints: true,
              draggbleWaypoint: false,
              fitSelectedRoutes: false,
              showAlternatives: true,
        }).addTo(map);
    })
    return null
}

export default LeafletRouting