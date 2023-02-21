import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
    fare: '',
    payment: false,
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
    setFare: (state, data) => {
      state.fare = data.payload
    },
    setPayment: (state) => {
      state.payment = true
    }
  },
});

export const { setShowModal,setUnShowModal, setFare, setPayment } = modalSlice.actions;
export default modalSlice.reducer;