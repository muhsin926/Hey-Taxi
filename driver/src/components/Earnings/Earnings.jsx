import axios from "axios";
import React, { useEffect, useState } from "react";

const Earnings = () => {
  const [earnings, setEarnings] = useState([]);

  const getDetails = async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/driver/earnings`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setEarnings(data.getEarnings);
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <>
      <div className="text-2xl mb-6 font-mono text-gray-600 font-semibold">
        Earnings By Day
      </div>
      <div className="relative overflow-x-auto rounded-xl">
        {earnings.length > 0 ? (
          <table className="w-full text-sm text-left ">
            <thead className="text-xs uppercase bg-black text-white ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Trip
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Fare
                </th>
                <th scope="col" className="px-6 py-3">
                  Earnings
                </th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((earn) => (
                <tr
                  className="hover:bg-gray-200 border-b bg-gray-100 "
                  key={earn._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {earn?._id}
                  </th>
                  <td className="px-6 py-4">{earn?.count}</td>
                  <td className="px-6 py-4">{earn?.total_fare}</td>
                  <td className="px-6 py-4">{Math.floor((earn?.total_fare) * 80 / 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="ml-4 mt-2 text-lg font-simibold text-red-500 text-center">
            No Earnings
          </div>
        )}
      </div>
    </>
  );
};

export default Earnings;
