import axios from "axios";
import React, { useEffect, useState } from "react";
import { blankProfile } from "../../assets";
import url from '../../api/Api'


const PendigRequest = () => {
    const [notification, setNotification] = useState([]);

    const getNotification = async () => {
        const { data } = await axios.get(`${url}/api/driver/requests`);
        setNotification(data.requests);
    };

    useEffect(() => {
        getNotification();
    }, []);

    return (
        <>
            {notification.length > 0 ? (
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <tbody>
                            {notification.map((noti) => (
                                <tr class="bg-white border-b">
                                    <td class="px-6 py-4 flex items-center">
                                        <img
                                            className="w-14 h-14 rounded-full"
                                            src={blankProfile}
                                            alt="profile"
                                        />
                                        <td class="px-6 py-6 whitespace-nowrap  ">
                                            {noti.sender?.name}
                                            <a
                                                className="block text-blue-700"
                                                href="https://wa.me/919744850926"
                                                target={"_blank"}
                                            >
                                                {noti.sender?.mobile}
                                            </a>
                                        </td>
                                    </td>
                                    <td class="px-6 py-6 whitespace-nowrap">{noti?.schedule}</td>
                                    <td class="px-6 py-6 whitespace-nowrap">
                                        {noti?.pickupLocation.split(",")[0]}
                                    </td>
                                    <td class="px-6 py-6 whitespace-nowrap">To</td>
                                    <td class="px-6 py-6 whitespace-nowrap">
                                        {noti?.destination.split(",")[0]}
                                    </td>
                                    <td class="px-6 py-6 whitespace-nowrap">
                                        <button className="bg-green-500 py-1 px-3 rounded text-base text-white">
                                            Accept
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="ml-4 mt-2 text-lg font-simibold text-red-500 text-center    ">Pending requests is empty..</div>
            )}
        </>
    );
};

export default PendigRequest;
