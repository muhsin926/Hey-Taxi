import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "./Table";

const TripManage = () => {
    const [underline, setUnderline] = useState("reserved");
    const [reserved, setReserved] = useState([])
    const [history, setHistory] = useState([])

    const getReservedTrips = async () => {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/driver/trips-booked`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setReserved(data.requests);
    };

    const getTripHistory = async () => {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/driver/trip-history`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setHistory(data.res)
    }

    useEffect(() => {
        getReservedTrips();
        getTripHistory()
    }, [underline]);

    return (
        <div>
            <div className="col-span-12 md:col-span-8 p-3 justify-around flex  ">
                <h1
                    onClick={() => setUnderline("reserved")}
                    className={`md:text-xl  font-mono text-gray-600 font-semibold cursor-pointer text-semibold hover:text-gray-400  text-xs sm:text-base ${underline == "reserved"
                        ? "underline underline-offset-[1.4rem] decoration-yellow-400 decoration-2"
                        : ""
                        }`}
                >
                    Reserved Trips
                </h1>
                <h1
                    onClick={() => setUnderline("history")}
                    className={`md:text-xl  font-mono text-gray-600 font-semibold cursor-pointer text-semibold hover:text-gray-400  text-xs sm:text-base ${underline == "history"
                        ? "underline underline-offset-[1.4rem] decoration-yellow-400 decoration-2"
                        : ""
                        }`}
                >
                    Trip History
                </h1>
            </div>
            <div className="grid grid-cols-12">
                {underline === "reserved" ? (
                    <div className="col-span-12 mt-12">
                        <Table row={reserved} />
                    </div>
                ) : (
                    <div className="col-span-12 mt-12">
                        <Table row={history} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TripManage;
