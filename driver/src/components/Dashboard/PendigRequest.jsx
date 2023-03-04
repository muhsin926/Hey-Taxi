import axios from "axios";
import React, { useEffect, useState } from "react";
import { blankProfile } from "../../assets";
import url from '../../api/Api'
import ReactPaginate from "react-paginate";


const PendigRequest = () => {
    const [notification, setNotification] = useState([]);
    const [pageNumber, setPageNumber] = useState(0)
    const getNotification = async () => {
        const { data } = await axios.get(`${url}/api/driver/requests`);
        setNotification(data.requests);
    };

    const accepted = async (id) => {
        const token = localStorage.getItem('token')
        const { data } = await axios.post(`${url}/api/driver/requests`, { id }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        data.status && toast.success("Request accepted")
    }

    useEffect(() => {
        getNotification();
    }, []);

    const usersPerPage = 4;
    const pageVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(notification.length / usersPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    const displayRows = notification?.slice(pageVisited, pageNumber + usersPerPage)
        .map((noti) => {
            return (<tr class="bg-white border-b">
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
                <td class="px-6 py-6 whitespace-nowrap">{noti?.schedule?.date}</td>
                <td class="px-6 py-6 whitespace-nowrap">
                    {noti?.pickupLocation.split(",")[0]}
                </td>
                <td class="px-6 py-6 whitespace-nowrap">To</td>
                <td class="px-6 py-6 whitespace-nowrap">
                    {noti?.destination.split(",")[0]}
                </td>
                <td class="px-6 py-6 whitespace-nowrap">
                    <button onClick={() => accepted(noti._id)} className="bg-green-500 py-1 px-3 rounded text-base text-white">
                        Accept
                    </button>
                </td>
            </tr>)
        })

    return (
        <>
            {notification.length > 0 ? (
                <><div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <tbody>
                            {displayRows}
                        </tbody>
                    </table>
                </div><ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"} /></>
            ) : (
                <div className="ml-4 mt-2 text-lg font-simibold text-red-500 text-center">Pending requests is empty..</div>
            )}
        </>
    );
};

export default PendigRequest;
