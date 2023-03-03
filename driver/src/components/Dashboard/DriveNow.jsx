import axios from 'axios';
import React, { useEffect, useState } from 'react'
import url from '../../api/Api'
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from 'react-redux';
import { setRideDetails } from '../../redux/slices/RideDetails';
import { useNavigate } from 'react-router';
import { setChaters, setToUserId } from '../../redux/slices/ChatSlice';

const DriveNow = () => {
    const dispatch = useDispatch()
    const [rideNow, setRideNow] = useState({})
    const navigate = useNavigate()

    const getRideNow = async () => {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${url}/api/driver/ride-now`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setRideNow(data.requests));
    };

    useEffect(() => {
        getRideNow();
    }, []);

    const showMap = (trip) => {
        navigate('/driving')
        dispatch(setRideDetails(trip))
    }

    const directToChat = (sender) => {
        dispatch(setToUserId(sender._id))
        dispatch(setChaters([sender]))
        navigate('/chat')
    }

    return (
        <>
            {rideNow.length > 0 ? (
                <div class="relative overflow-x-auto bg-black rounded-xl text-white">
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
                                    Message
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Start
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rideNow.map((trip) => (
                                <tr class="text-black border-b hover:bg-gray-200 bg-gray-100" key={trip._id}>
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
                                        <button onClick={() => directToChat(trip?.sender)} className='bg-green-500 text-white text-sm rounded p-1 px-2 hover:bg-green-600 '>
                                            Chat
                                        </button>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button onClick={() => showMap(trip)} className='bg-green-500 text-white hover:bg-green-600  rounded-full'>
                                            <FontAwesomeIcon icon={faPowerOff} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : <div className="ml-4 mt-2 text-lg font-simibold text-red-500 text-center">There is no ride..</div>
            }
        </>
    )
}

export default DriveNow