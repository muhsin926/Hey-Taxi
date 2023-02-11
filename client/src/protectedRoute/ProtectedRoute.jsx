import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../customHooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const authenticated = useAuth();
  const navigate = useNavigate();
  if (!authenticated) {
    navigate("/login");
    return;
  }
  return children;
};

export default ProtectedRoute;
