import React, { useCallback, useContext, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import { LocationContext } from "../../context/LocationContext";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../../api/Api";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../../redux/slices/ModalSlice";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { cash, paypal } from "../../assets";
import Paypal from "./Paypal";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const RideBooking = () => {
  const [fare, setFare] = useState();
  const { scheduleDate, scheduleTime } = useSelector(
    (state) => state.scheduleRide
  );
  // const { showModal} = useSelector((state) => state.modal)
  const dispatch = useDispatch();
  const { startingCoordinates, destinationCoordinates } =
    useContext(LocationContext);
  const { setStarting, setDestination, distance, duration } =
    useContext(LocationContext);
  const [startPoint, setStartPoint] = useState();
  const [endPoint, setEndPoint] = useState();
  const [startSuggestion, setStartSuggestion] = useState([]);
  const [endSuggestion, setEndSuggestion] = useState([]);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    navigate("/schedule_ride");
  };

  const handleStartInput = async (e) => {
    const quary = e.target.value;
    if (!quary) {
      setStartSuggestion([]);
      return;
    }
    const url = `${
      import.meta.env.VITE_MAPBOX_GEOCODING_URL
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
    const url = `${
      import.meta.env.VITE_MAPBOX_GEOCODING_URL
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

  const getCategory =useCallback(async () => {
    const response = await axios.get(`${url}/api/passenger/carCategory`);
    setCategory(response.data.cat);
  },[])
  useEffect(() => {
    getCategory()
  },[getCategory])



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
            {/* <h1>Distance : {distance} KM</h1>
            <h1>Duration : {duration} minutes</h1> */}
            <div>
              {/* <Button
                stlye={
                  " text-center py-2 px-3 rounded bg-yellow-400  my-1 font-semibold"
                }
                title={"Request Now"}
              /> */}
              <Button
                stlye={
                  " text-center py-1 px-3 rounded bg-gray-900 text-white mb-3 my-1 text-base"
                }
                title={`${
                  scheduleDate && scheduleTime
                    ? "scheduled for " + scheduleDate + "," + scheduleTime
                    : "Schdule for later"
                }`}
                handleClick={handleClick}
              />
            </div>
          </div>
        }
        <div className="max-h-52 scrollbar-hide overflow-y-auto">
          {startingCoordinates &&
            destinationCoordinates &&
            category.map((car) => (
              <div
                onClick={() => {
                  setShowModal(true);
                  setFare(car.rate);
                }}
                className="grid grid-cols-12 border border-gray-300 rounded-md my-1 cursor-pointer"
              >
                <div className="col-span-4">
                  <img
                    className="w-full object-cover"
                    src={car.image}
                    alt="car image"
                  />
                </div>
                <div className="col-span-8 flex flex-col pt-2 ">
                  <div className="flex  ">
                    <div className="flex ">
                      <h1 className="font-medium">{car.name}</h1>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 35 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.0104 25.5859C19.5619 25.5859 16.341 25.5859 14.2499 22.7223C12.1588 19.8587 19.5619 17.7109 24.0104 17.7109C28.4588 17.7109 35.8631 19.8587 33.7714 22.7222C31.6798 25.5858 28.4588 25.5859 24.0104 25.5859Z"
                          fill="black"
                        />
                        <circle
                          cx="24.0107"
                          cy="8.71094"
                          r="5.625"
                          fill="black"
                        />
                      </svg>
                      <h1>{car.capacity}</h1>
                      {/* {setFare(car.rate * distance)} */}
                      <h1 className="ml-5">₹{car.rate * distance}</h1>
                    </div>
                  </div>
                  <p className="text-base text-zinc-500">{car.discription}</p>
                </div>
              </div>
            ))}
        </div>
      </motion.div>
      {showModal && (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative   my-6 mx-auto md:w-1/3  ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex text-black flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start bg-black justify-between border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-base ml-6 py-4 text-white">
                    Payment Methode
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col ">
                  <div className="relative  w-full min-h-fit  ">
                    <Paypal fare={fare} />
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="text-red-500 hover:bg-gray-200 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40  bg-black"></div>
        </>
      )}
    </>
  );
};

export default RideBooking;
