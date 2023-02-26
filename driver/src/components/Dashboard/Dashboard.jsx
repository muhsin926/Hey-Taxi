import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import url from "../../api/Api";
import { io } from "socket.io-client";
import { setSocket } from "../../redux/slices/SocketSlice";
import TripsBooked from "./TripsBooked";
import PendigRequest from "./PendigRequest";
import DriveNow from "./DriveNow";
import Map from "./Map";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const [underline, setUnderline] = useState("request");
  const [available, setAvailable] = useState(false);
  const [showMap, setShowMap] = useState(false)

  socket &&
    socket.on("request-receive", (data) => {
      setNotification(data.messsage);
      console.log(data.message);
      console.log(data);
    });

  useEffect(() => {
    socket &&
      socket.on("request-receive", (data) => {
        setNotification(data.messsage);
        console.log(data.message);
        console.log(data);
      });
  }, [socket]);
  const handleAvailable = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .post(
        `${url}/api/driver/available`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setAvailable(!available);
      });
  };

  return (
    <>
      {showMap ? <Map setShowMap={setShowMap} /> : (
        <><div className=" grid grid-cols-12 relative">
          <div className="block md:hidden col-span-12 ">
            <div className="  mb-2 flex justify-end">
              <button
                className={` text-base  ${available ? "bg-green-400" : "bg-red-500"} text-white py-2 px-3 shadow-2xl`}
                onClick={handleAvailable}
              >
                Available
              </button>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 p-3 justify-between flex  ">
            <h1
              onClick={() => setUnderline("drive")}
              className={`cursor-pointer text-semibold hover:text-gray-400  text-xs sm:text-base md:text-lg ${underline == "drive"
                ? "underline underline-offset-[1.4rem] decoration-yellow-400 decoration-2"
                : ""}`}
            >
              Drive Now
            </h1>
            <h1
              onClick={() => setUnderline("request")}
              className={`cursor-pointer text-semibold hover:text-gray-400  text-xs sm:text-base md:text-lg ${underline == "request"
                ? "underline underline-offset-[1.4rem] decoration-yellow-400 decoration-2"
                : ""}`}
            >
              Pending Request
            </h1>
            <h1
              onClick={() => setUnderline("trip")}
              className={`cursor-pointer text-semibold hover:text-gray-400 text-xs sm:text-base md:text-lg ${underline == "trip"
                ? "underline underline-offset-[1.4rem] decoration-yellow-400 decoration-2"
                : ""}`}
            >
              Booked Trips
            </h1>
          </div>
          <div className="md:block hidden col-span-4 ">
            <div className=" p-3 flex justify-end">
              <button
                className={` text-base  ${available ? "bg-green-400" : "bg-red-500"} text-white py-2 px-3 shadow-2xl`}
                onClick={handleAvailable}
              >
                Available
              </button>
            </div>
          </div>
        </div><div className="grid grid-cols-12">
            {underline == "request" ? (
              <div className="col-span-12 mt-12">
                <PendigRequest />
              </div>
            ) : underline == 'drive' ? (
              <div className="col-span-12 mt-12">
                <DriveNow setShowMap={setShowMap} />
              </div>
            ) : (
              <div className="col-span-12 mt-12">
                <TripsBooked />
              </div>
            )}
          </div></>
      )}
    </>
  );
};

export default Dashboard;
