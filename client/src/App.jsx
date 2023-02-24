import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RideBookingPage, SignupPage } from "./pages";
import RideSchedulePage from "./pages/RideSchedulePage";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/slices/SocketSlice";
import ProfilePage from "./pages/ProfilePage";


function App() {
  const { socket } = useSelector((state) => state.socket)
  const dispatch = useDispatch()
  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const data = io(import.meta.env.VITE_SERVER_DOMAIN)
    dispatch(setSocket(data))
    socket && socket.emit("addUser", userId);
  }, [])
  return (
    <div>
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ride" element={<RideBookingPage />} />
        <Route path="/schedule_ride" element={<RideSchedulePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
