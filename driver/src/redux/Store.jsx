import { configureStore } from "@reduxjs/toolkit";
import docReducer from './slices/DocumentsSlice'
import modal from './slices/ModalSlice'
import socket from './slices/SocketSlice'
import auth from './slices/AuthSlice'
import rideDetails from './slices/RideDetails'
import chatSlice from "./slices/ChatSlice";

export default  configureStore({
    reducer: {
        vehicleInformations : docReducer,
        modal: modal,
        socket: socket,
        auth: auth,
        rideDetails: rideDetails,
        chatSlice: chatSlice
    }
})