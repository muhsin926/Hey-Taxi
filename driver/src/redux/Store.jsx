import { configureStore } from "@reduxjs/toolkit";
import docReducer from './slices/DocumentsSlice'
import modal from './slices/ModalSlice'
import socket from './slices/SocketSlice'
import auth from './slices/AuthSlice'


export default  configureStore({
    reducer: {
        vehicleInformations : docReducer,
        modal: modal,
        socket: socket,
        auth: auth
    }
})