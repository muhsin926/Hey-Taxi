import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setUserId } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
