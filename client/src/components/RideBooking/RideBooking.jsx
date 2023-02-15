import React, { useContext, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import { LocationContext } from "../../context/LocationContext";
import Button from "../Button/Button";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const RideBooking = () => {
  const { startingCoordinates, destinationCoordinates } = useContext(LocationContext)
  const { setStarting, setDestination, distance, duration } = useContext(LocationContext);
  const [startPoint, setStartPoint] = useState();
  const [endPoint, setEndPoint] = useState();
  const [startSuggestion, setStartSuggestion] = useState([]);
  const [endSuggestion, setEndSuggestion] = useState([]);

  const handleStartInput = async (e) => {
    const quary = e.target.value;
    if (!quary) {
      setStartSuggestion([]);
      return;
    }
    const url = `${import.meta.env.VITE_MAPBOX_GEOCODING_URL
      }/${encodeURIComponent(quary)}
        .json?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    setStartSuggestion(data.features.map((f) => f.place_name));
  };

  const handleStartLocation = (location) => {
    setStarting(location);
    setStartPoint(location);
    setStartSuggestion([]);
  };

  const handleEndInput = async (e) => {
    const quary = e.target.value;
    if (!quary) {
      setEndSuggestion([]);
      return;
    }
    const url = `${import.meta.env.VITE_MAPBOX_GEOCODING_URL
      }/${encodeURIComponent(quary)}
        .json?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    setEndSuggestion(data.features.map((f) => f.place_name));
  };

  const handleEndLocation = (location) => {
    setDestination(location);
    setEndPoint(location);
    setEndSuggestion([]);
  };

  return (
    <>
      <motion.div
        initial={{ x: "-10vw", opacity: 0 }}
        animate={{ x: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, delay: 0.4 }}
        className="mainCard xs:w-96 p-10 bg-white  rounded"
      >
        <motion.div
          initial={{ y: "-10vw", opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, delay: 0.6 }}
          className="flex justify-center align-middle mt-10"
        >
          <h1 className="text-3xl font-semibold">Request a ride now</h1>
        </motion.div>

        <motion.div
          initial={{ y: "-10vw", opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, delay: 0.9 }}
          className="mt-10"
        >
          <input
            type="text"
            className={
              "border border-grey bg-slate-200 w-full p-3 mb-4 rounded"
            }
            placeholder="Enter you start in location"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            onInput={handleStartInput}
          />
          {startSuggestion.length > 0 && (
            <ul className="mb-2 z-10 bg-white border border-gray-400 w-full max-h-48 overflow-y-scroll rounded shadow-md">
              {startSuggestion.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleStartLocation(suggestion)}
                  className="cursor-pointer hover:bg-gray-200 p-2 border-b border-gray-400"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          <input
            type="text"
            className=" border border-grey bg-slate-200 w-full p-3 rounded mb-4"
            placeholder="Enter your destination"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            onInput={handleEndInput}
          />
          {endSuggestion.length > 0 && (
            <ul className="mb-2 z-10 bg-white border border-gray-400 w-full max-h-48 overflow-y-scroll rounded shadow-md">
              {endSuggestion.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleEndLocation(suggestion)}
                  className="cursor-pointer hover:bg-gray-200 p-2 border-b border-gray-400"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
        {
          <div className="flex flex-col justify-center">
            <h1>Distance : {distance} KM</h1>
            <h1>Duration : {duration} minutes</h1>
            <div>
              <Button
                stlye={
                  " text-center py-2 px-3 rounded bg-yellow-400  my-1 font-semibold"
                }
                title={"Request Now"}
              />
              <Button
                stlye={
                  " text-center py-2 px-3 rounded bg-gray-300  my-1 font-medium"
                }
                title={"Schdule for later"}
              />
            </div>
          </div>
        }
      </motion.div>
    </>
  );
};

export default RideBooking;
