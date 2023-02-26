import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../../api/Api'
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DriveNow = ({ setShowMap }) => {
    const [rideNow,setRideNow] = useState([])

    const getRideNow = async () => {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${url}/api/driver/ride-now`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setRideNow(data.requests);
    };

    useEffect(() => {
        getRideNow();
    }, []);

  return (
    <div class="relative overflow-x-auto">
    {rideNow.length > 0 ?
        <table class="w-full text-sm text-left">
            <thead class="text-xs uppercase">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Passenger
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Pickup Location
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Drop Off Location
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Start
                    </th>
                </tr>
            </thead>
            <tbody>
                {rideNow.map((trip) => (
                    <tr class="bg-white border-b" key={trip._id}>
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
                        <td class="px-6 py-4">
                            <button onClick={()=>setShowMap(true)} className='bg-green-500 text-white hover:bg-green-600  rounded-full'>
                                <FontAwesomeIcon icon={faPowerOff} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        : <div className="ml-4 mt-2 text-xl font-simibold">There is no ride..</div>
    }
</div>
  )
}

export default DriveNow