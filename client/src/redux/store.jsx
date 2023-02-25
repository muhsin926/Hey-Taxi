import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import scheduleRide from './slices/ScheduleSlice';
import modal from './slices/ModalSlice';
import socket from './slices/SocketSlice';
import locationSlice from './slices/BookingLocationsSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    scheduleRide: scheduleRide,
    modal: modal,
    socket: socket,
    locationSlice: locationSlice
  },
});
