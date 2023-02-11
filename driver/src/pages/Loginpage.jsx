import React from "react";
import { Login, Navbar } from "../components";
import ProtectedSignRoute from "../protectedRoute/ProtectedSignRoute";

const Loginpage = () => {
  return (
    <>
      <ProtectedSignRoute>
        <Navbar />
        <Login />
      </ProtectedSignRoute>
    </>
  );
};

export default Loginpage;
