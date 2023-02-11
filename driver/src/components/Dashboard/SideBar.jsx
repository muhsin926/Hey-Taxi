import React from "react";
import Button from "../Button/Button";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Vehicles", href: "/vehicles", current: false },
  { name: "Inbox", href: "#", current: false },
  { name: "Earnings", href: "#", current: false },
  { name: "Trip Management", href: "#", current: false },
];

const SideBar = () => {
  return (
    <div>
      {navigation.map((data) => (
        <Button
          style={
            "rounded-md p-2 w-full text-base font-medium hover:bg-slate-100 hover:text-black mb-3"
          }
          title={data.name}
          bg={
            data.current &&
            "bg-yellow-300 text-black rounded-md p-2 w-full text-base font-medium mb-3"
          }
          onclick={data.href}
        />
      ))}
    </div>
  );
};

export default SideBar;
