import { configureStore } from "@reduxjs/toolkit";
import docReducer from './slices/DocumentsSlice'


export default  configureStore({
    reducer: {
        vehicleInformations : docReducer,
    }
})