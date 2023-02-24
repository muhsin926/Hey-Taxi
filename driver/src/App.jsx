import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard, Navbar, SideBar, Vehicle } from "./components";
import DashboardPage from "./pages/DashboardPage";
import DocUploaderPage from "./pages/DocUploaderPage";
import Loginpage from "./pages/Loginpage";
import RequirementPage from "./pages/RequirementPage";
import SignupPage from "./pages/SignupPage";
import VehiclesPage from "./pages/VehiclesPage";
import {io} from "socket.io-client";
import { setSocket } from "./redux/slices/SocketSlice";
import jwt_decode from "jwt-decode";
import { setUserId } from "./redux/slices/AuthSlice";

const App = () => {
  const { userId } = useSelector((state) => state.auth)
  const { socket } = useSelector((state) => state.socket)
  const dispatch = useDispatch()
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const decoded = jwt_decode(token);
    dispatch(setUserId(decoded.userId))
    const data = io(import.meta.env.VITE_SERVER_DOMAIN)
    dispatch(setSocket(data))
    console.log(userId);
    socket && socket.emit("addDriver", userId);
  }, [])
  return (
    <>
      <Router>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/requirements" element={<RequirementPage />} />
              <Route path="/requirements/docUpload" element={<DocUploaderPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
            </Routes>
      </Router>
    </>
  );
};

export default App;
