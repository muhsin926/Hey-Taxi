import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../customHooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const authenticated = useAuth();
  const navigate = useNavigate();
  console.log(authenticated);
  if (!authenticated) {
    navigate("/login");
    return;
  }
  return children;
};

export default ProtectedRoute;
