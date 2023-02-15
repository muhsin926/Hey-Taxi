import React from "react";
import { Login, Navbar } from "../components";
import ProtectedSignRoute from "../protectedRoute/ProtectedSignRoute";

const LoginPage = () => {
  return (
    <>
      <ProtectedSignRoute>
        <Navbar home={false} li={"Sign Up"} />
        <Login />
      </ProtectedSignRoute>
    </>
  );
};

export default LoginPage;
