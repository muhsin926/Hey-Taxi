import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import url from '../../api/Api'
import { io } from 'socket.io-client'
import { setSocket } from "../../redux/slices/SocketSlice";

const upcomingTrip = [
  { name: "Steve jobs", pickup: "Mumbai", droppoff: "Delhi", date: "25/2/23" },
  { name: "Steve jobs", pickup: "Mumbai", droppoff: "Delhi", date: "28/2/23" },
  { name: "Steve jobs", pickup: "Mumbai", droppoff: "Delhi", date: "2/3/23" },
];

const Dashboard = () => {
  const dispatch = useDispatch()
  const { socket } = useSelector((state) => state.socket)
  const [underline, setUnderline] = useState("request");
  const [available, setAvailable] = useState(false);
  const [notification, setNotification] = useState({})


  socket && socket.on("request-receive", (data) => {
    setNotification(data.messsage)
    console.log(data.message);
    console.log(data);
  })


  useEffect(() => {
    socket && socket.on("request-receive", (data) => {
      setNotification(data.messsage)
      console.log(data.message);
      console.log(data);
    })
  }, [socket])
  const handleAvailable = () => {
    const token = localStorage.getItem("token")
    console.log(token);
    axios.post(`${url}/api/driver/available`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setAvailable(!available)
      })
  }

  return (
    <>
      <p></p>
      <div className=" grid grid-cols-12 relative">
        <div className="block md:hidden col-span-12 ">
          <div className="  mb-2 flex justify-end">
            <button
              className={` text-base  ${available ? "bg-green-400" : "bg-red-500"
                } text-white py-2 px-3 shadow-2xl`}
              onClick={handleAvailable}
            >
              Available
            </button>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 p-3 justify-between flex  ">
          <h1
            onClick={() => setUnderline("request")}
            className={`cursor-pointer text-semibold  text-xs sm:text-base md:text-lg ${underline == "request"
              ? "underline underline-offset-[2rem] decoration-yellow-400 decoration-2"
              : ""
              }`}
          >
            Pending Request
          </h1>
          <h1
            onClick={() => setUnderline("trip")}
            className={`cursor-pointer text-semibold text-xs sm:text-base md:text-lg ${underline == "request"
              ? ""
              : "underline underline-offset-[2rem] decoration-yellow-400 decoration-2"
              }`}
          >
            Upcoming Trips
          </h1>
        </div>
        <div className="md:block hidden col-span-7 ">
          <div className=" p-3 flex justify-end">

            <button
              className={` text-base  ${available ? "bg-green-400" : "bg-red-500"
                } text-white py-2 px-3 shadow-2xl`}
              onClick={handleAvailable}
            >
              Available
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12">
        {underline == "request" ? (
          <div className="col-span-7 mt-12">
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <tbody>
                  {upcomingTrip.map((trip) => (
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">{trip.name}</td>
                      <td class="px-6 py-4">{trip.pickup}</td>
                      <td class="px-6 py-4">{trip.droppoff}</td>
                      <td class="px-6 py-4">
                        <button className="bg-green-500 p-1 rounded text-base text-white">
                          Accept
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="col-span-7 mt-12">
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="text-xs uppercase">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Passenger
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Pickup Location
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Drop Off Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingTrip.map((trip) => (
                    <tr class="bg-white border-b">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        {trip.date}
                      </th>
                      <td class="px-6 py-4">{trip.name}</td>
                      <td class="px-6 py-4">{trip.pickup}</td>
                      <td class="px-6 py-4">{trip.droppoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
