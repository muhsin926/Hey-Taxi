import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../api/Api";



const TripsBooked = () => {
    const [booked, setBooked] = useState([]);

    const getBookedTrips = async () => {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${url}/api/driver/trips-booked`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setBooked(data.requests);
    };

    useEffect(() => {
        getBookedTrips();
    }, []);

    return (
        <div class="relative overflow-x-auto">
            {booked.length > 0 ?
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
                        {booked.map((trip) => (
                            <tr class="bg-white border-b" key={trip._id}>
                                <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                    {trip?.schedule?.date}
                                </th>
                                <td class="px-6 py-4">
                                    {trip.sender?.name}
                                    <a
                                        className="block text-blue-700"
                                        href="https://wa.me/919744850926"
                                        target={"_blank"}
                                    >
                                        {trip.sender?.mobile}
                                    </a>
                                </td>
                                <td class="px-6 py-4">{trip?.pickupLocation}</td>
                                <td class="px-6 py-4">{trip?.destination}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <div className="ml-4 mt-2 text-lg font-simibold text-red-500 text-center">Booked trips is empty..</div>
            }
        </div>
    );
};

export default TripsBooked;
