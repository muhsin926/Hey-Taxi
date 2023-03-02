import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";

const navigation = [
  { name: "Dashboard", href: "/", current: false },
  { name: "Driver Manage", href: "/driver", current: false },
  { name: "User Manage", href: "/passenger", current: false },
  { name: "Vehicles", href: "/vehicle", current: true },
  { name: "Vehicle Category", href: "/vehicle_category", current: false },
  { name: "Earnings", href: "/earnings", current: false },
];

const SideBar = () => {
  const location = useLocation();
  return (
    <div className="">
      {navigation.map((data) => (
        <Button
          style={
            "rounded-md p-2 w-full text-base font-medium hover:bg-slate-100 hover:text-black mb-3"
          }
          title={data.name}
          click={data.href}
          bg={
            location.pathname == data.href &&
            "bg-yellow-400 text-black rounded-md p-2 w-full text-base font-medium mb-3"
          }
        />
      ))}
    </div>
  );
};

export default SideBar;
