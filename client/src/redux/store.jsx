import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import scheduleRide from './slices/ScheduleSlice';
import modal from './slices/ModalSlice';
import socket from './slices/SocketSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    scheduleRide: scheduleRide,
    modal: modal,
    socket: socket,
  },
});
