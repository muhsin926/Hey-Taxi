import { configureStore } from "@reduxjs/toolkit";
import docReducer from './slices/DocumentsSlice'
import modal from './slices/ModalSlice'


export default  configureStore({
    reducer: {
        vehicleInformations : docReducer,
        modal: modal
    }
})