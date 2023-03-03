import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toDriverId: null
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setToDriverId: (state, data) => {
      state.scheduleDate = data.payload;
    },
  
  },
});

export const { setToDriverId } = chatSlice.actions;
export default chatSlice.reducer;