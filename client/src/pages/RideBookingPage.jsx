import React from "react";
import { RideBooking } from "../components";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";

const RideBookingPage = () => {
  return (
    <>
      <ProtectedRoute>
        <RideBooking />
      </ProtectedRoute>
    </>
  );
};

export default RideBookingPage;
