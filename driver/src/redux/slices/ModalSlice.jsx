import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowModal: (state) => {
      state.showModal = true;
    },
    setUnShowModal : (state) => {
        state.showModal = false;
    },
  },
});

export const { setShowModal,setUnShowModal } = modalSlice.actions;
export default modalSlice.reducer;