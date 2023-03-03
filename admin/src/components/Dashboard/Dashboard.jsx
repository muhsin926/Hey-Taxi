import React, { useEffect, useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../../api/Api";
import NewUsers from "./NewUsers";

const briefInfo = [
  { title: "All Users", count: "10", href: "/passenger" },
  { title: "All Driver", count: "10", href: "/driver" },
  { title: "All Trips", count: "10", href: "/trip_manage" },
  { title: "Profit", count: "20000", href: "/sales_report" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [allCount, setAllCount] = useState([]);

  const getShortInfo = async () => {
    const { data } = await axios.get(`${url}/api/admin/getShortInfo`);
    setAllCount(data);
  };

  useEffect(() => {
    getShortInfo();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 p-5 gap-3">
        {briefInfo.map((info, i) => (
          <div className="sm:col-span-6 col-span-12 md:col-span-3 hover:bg-gradient-to-l bg-gradient-to-r  from-zinc-700 hover:shadow-xl to-black  p-3 rounded-md text-white">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold text-gray-400">
                {info.title}
              </h1>
              <button
                onClick={() => navigate(info.href)}
                type="button"
                className="cursor-pointer bg-yellow-300 hover:bg-yellow-100 rounded-md"
              >
                <ArrowUpRightIcon
                  className="block h-3 w-3 text-black"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div>
              <h1 className="text-2xl p-4 ">{allCount[i]}</h1>
            </div>
          </div>
        ))}
      </div>
      <NewUsers />
    </>
  );
};

export default Dashboard;
