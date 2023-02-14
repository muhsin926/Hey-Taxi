import axios from "axios";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const getDirection = async (startingCoordinates, destinationCoordinates) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startingCoordinates[0]},${startingCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxgl.accessToken}`;
    const result = await axios.get(url);
    return result;
};

