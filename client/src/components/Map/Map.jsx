import React, { useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map', 
            style: 'mapbox://styles/mapbox/streets-v12', 
            center: [-74.5, 40], 
            zoom: 9, 
        });
    },[]);

  return <div id="map" className="h-screen w-full" />
}

export default Map