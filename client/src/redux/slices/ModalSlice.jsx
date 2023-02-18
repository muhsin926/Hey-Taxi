import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: true,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowModal: (state) => {
      state.showModal = true;
    },
    setUnShowModal : (state) => {
        state.showModal = true;
    }
  },
});

export const { setShowModal,setUnShowModal } = modalSlice.actions;
export default modalSlice.reducer;