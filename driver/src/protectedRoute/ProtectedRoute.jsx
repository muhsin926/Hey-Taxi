import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../customHooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const authenticated = useAuth();
  const navigete = useNavigate();
  if (!authenticated) {
    navigete("/login");
    return;
  }
  return children;
};

export default ProtectedRoute;
