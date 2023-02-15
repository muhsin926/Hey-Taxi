import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";

const navigation = [
  { name: "Dashboard", href: "/", current: false },
  { name: "Vehicles", href: "/vehicles", current: false },
  { name: "Inbox", href: "#", current: false },
  { name: "Earnings", href: "#", current: false },
  { name: "Trip Management", href: "#", current: false },
];

const SideBar = () => {
  const location = useLocation()
  return (
    <div>
      {navigation.map((data) => (
        <Button
          style={
            "rounded-md p-2 w-full text-base font-medium hover:bg-slate-100 hover:text-black mb-3"
          }
          title={data.name}
          bg={
            location.pathname == data.href &&
            "bg-yellow-300 text-black rounded-md p-2 w-full text-base font-medium mb-3"
          }
          onclick={data.href}
          key={data.name}
        />
      ))}
    </div>
  );
};

export default SideBar;
