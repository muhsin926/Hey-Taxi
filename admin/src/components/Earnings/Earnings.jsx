import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import url from "../../api/Api";

const Earnings = () => {
  const [earnings, setEarnings] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`${url}/api/admin/getEarnings`);
    setEarnings(data.getEarnings);
  };

  useEffect(() => {
    getData();
  }, []);

  const data = {
    labels: earnings?.map((date) => date._id),
    datasets: [
      {
        label: "Profit",
        data: earnings?.map((data) => data.total_fare),
        backgroundColor: ["yellow"],
      },
    ],
  };

  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default Earnings;
