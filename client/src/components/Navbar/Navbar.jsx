import React from "react";
import { logo,logo1 } from "../../assets";
const Navbar = () => {
  return (
    <nav className="flex justify-around w-full absolute navBottom text-white shadow-lg py-5 ">
      <div className="flex items-center ">
        <img src={logo1} className="w-44" alt="image" />
      </div>
      <div className="grid justify-items-end">
      <ul className="flex" >
        <li className=" ml-12">Passanger</li>
        <li className=" ml-12">Driver</li>
        <li className=" ml-12">Sign in</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
