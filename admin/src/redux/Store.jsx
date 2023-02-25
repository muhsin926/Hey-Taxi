import { configureStore } from "@reduxjs/toolkit";
import modal from "./slices/ModalSlice";

export default configureStore({
  reducer: {
    modal: modal,
  },
});
