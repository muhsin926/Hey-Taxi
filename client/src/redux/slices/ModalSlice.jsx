import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
    fare: '',
    payment: false,
    categoryId: null
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
    },
    setCategoryId: (state, data) => {
      state.categoryId = data.payload
    },
  },
});

export const { setShowModal,setUnShowModal, setFare, setPayment,setCategoryId } = modalSlice.actions;
export default modalSlice.reducer;