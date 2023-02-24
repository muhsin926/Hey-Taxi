import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/slices/auth";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      return;
    }
    const decoded = jwt_decode(token);
    dispatch(setUserId(decoded.userId))
    setAuthenticated(true);
  }, []);
  return authenticated;
};

export default useAuth;
