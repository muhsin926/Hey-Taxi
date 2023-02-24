import React from "react";
import { Navbar, Signup } from "../components";
import ProtectedSignRoute from "../protectedRoute/ProtectedSignRoute";

const SignupPage = () => {
  return (
    <>
      <ProtectedSignRoute>
        <Navbar />
        <Signup />
      </ProtectedSignRoute>
    </>
  );
};

export default SignupPage;
