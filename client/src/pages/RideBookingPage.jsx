import React from "react";
import { Footer, Map, Navbar, RideBooking } from "../components";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";

const RideBookingPage = () => {
  return (
    <>
      <ProtectedRoute>
        <Navbar />
        <Map />
        <RideBooking />
      </ProtectedRoute>
    </>
  );
};

export default RideBookingPage;
