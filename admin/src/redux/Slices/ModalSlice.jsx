import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  passengerModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowModal: (state) => {
      state.showModal = true;
    },
    setUnShowModal: (state) => {
      state.showModal = false;
    },
    setPassModal: (state) => {
      state.passengerModal = true;
    },
    setUnPassModal: (state) => {
      state.passengerModal = false;
    },
  },
});

export const { setShowModal, setUnShowModal, setPassModal, setUnPassModal } =
  modalSlice.actions;
export default modalSlice.reducer;
