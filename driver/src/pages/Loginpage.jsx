import React from "react";
import { Login, Navbar } from "../components";
import ProtectedSignRoute from "../protectedRoute/ProtectedSignRoute";

const Loginpage = () => {
  return (
    <>
        <Navbar />
        <Login />
    </>
  );
};

export default Loginpage;
