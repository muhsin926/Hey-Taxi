import React from "react";
import { Navbar, Signup } from "../components";
import ProtectedSignRoute from "../protectedRoute/ProtectedSignRoute";

const SignupPage = () => {
  return (
    <>
        <Navbar />
        <Signup />
    </>
  );
};

export default SignupPage;
