import React, { useCallback, useContext, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import { LocationContext } from "../../context/LocationContext";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import TaxiCategories from "./TaxiCategories";
import axios from "axios";
import url from "../../api/Api"
import { setEndPoint, setStartPoint } from "../../redux/slices/BookingLocationsSlice";
import dateFormat, { masks } from "dateformat";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const RideBooking = () => {
  const { showModal, payment } = useSelector((state) => state.modal);
  const { scheduleDate, scheduleTime } = useSelector(
    (state) => state.scheduleRide
  );
  const { startPoint, endPoint } = useSelector((state) => state.locationSlice)
  const { startingCoordinates, destinationCoordinates } =
    useContext(LocationContext);
  const { setStarting, setDestination } = useContext(LocationContext);
  const [startSuggestion, setStartSuggestion] = useState([]);
  const [endSuggestion, setEndSuggestion] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.post(`${url}/api/passenger/ride-request`, { startPoint, endPoint }, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }, [payment])

  const handleClick = () => {
    navigate("/schedule_ride");
  };
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
    dispatch(setStartPoint(location));
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
    dispatch(setEndPoint(location));
    setEndSuggestion([]);
  };

  return (
    <>
      <motion.div
        initial={{ x: "-10vw", opacity: 0 }}
        animate={{ x: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, delay: 0.4 }}
        className="mainCard xs:w-96 mr-10 xs:mr-0 p-10 bg-white  rounded "
      >
        <motion.div
          initial={{ y: "-10vw", opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, delay: 0.6 }}
          className="flex justify-center align-middle "
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
            onChange={(e) => dispatch(setStartPoint(e.target.value))}
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
            onChange={(e) => dispatch(setEndPoint(e.target.value))}
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
            <div>
              <Button
                stlye={
                  " text-center py-1 px-3 rounded bg-gray-900 text-white mb-3 my-1 text-base"
                }
                title={`${scheduleDate && scheduleTime
                    ? "Scheduled for " + dateFormat(scheduleDate + "," + scheduleTime, 'mm,d,yyyy')
                    : "Schdule for later"
                  }`}
                handleClick={handleClick}
              />
            </div>
          </div>
        }
        {startingCoordinates && destinationCoordinates && <TaxiCategories />}
      </motion.div>
      {showModal && <Modal />}
    </>
  );
};

export default RideBooking;
