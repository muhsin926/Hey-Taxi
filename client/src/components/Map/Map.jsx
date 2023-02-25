import React, { useContext, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { getDirection } from '../../api/GetDirectionCodinates'
import { LocationContext } from '../../context/LocationContext';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {
    const { startingCoordinates, destinationCoordinates, setDistance, setDuration } = useContext(LocationContext)
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-74.5, 40],
            zoom: 9,
        });

        map.on("load", async () => {
            const bounds = new mapboxgl.LngLatBounds();
            if (startingCoordinates && destinationCoordinates) {
                await getDirection(startingCoordinates, destinationCoordinates).then(
                    (result) => {
                        const routeLayer = {
                            id: "route",
                            type: "line",
                            source: {
                                type: "geojson",
                                data: {
                                    type: "Feature",
                                    properties: {},
                                    geometry: result.data.routes[0].geometry,
                                },
                            },
                            layout: {
                                "line-join": "round",
                                "line-cap": "round",
                            },
                            paint: {
                                "line-color": "#888",
                                "line-width": 8,
                            },
                        };

                        map.addLayer(routeLayer);
                    }
                );
            }
            if (startingCoordinates) {
                addToMap(map, startingCoordinates);
                bounds.extend(startingCoordinates);
            }

            if (destinationCoordinates) {
                addToMap(map, destinationCoordinates);
                bounds.extend(destinationCoordinates);
            }
            addBoundsToMap(map, bounds);
        });


        const tripDetails = async () => {
            const response = await getDirection(
                startingCoordinates,
                destinationCoordinates
            );

            const data = response.data.waypoints[0].distance;
            let distance = Math.floor(data);
            let inSecond = Math.floor(response.data.routes[0].duration);
            let inMinute = inSecond / 2
            setDistance(distance);
            setDuration(inMinute)
            console.log(distance);
        };

        tripDetails();
    }, [startingCoordinates, destinationCoordinates]);

    const addToMap = (map, coordinates) => {
        new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    };

    const addBoundsToMap = (map, bounds) => {
        map.fitBounds(bounds, { padding: 20 });
    };

    return <div id="map" className="h-screen w-full" />
}

export default Map