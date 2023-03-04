import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toDriverId: ''
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setToDriverId: (state, data) => {
      state.toDriverId = data.payload;
    },
  
  },
});

export const { setToDriverId } = chatSlice.actions;
export default chatSlice.reducer;