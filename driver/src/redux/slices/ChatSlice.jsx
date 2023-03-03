import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toUserId: null,
  chaters: []
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setToUserId: (state, data) => {
      state.toUserId = data.payload;
    },
    setChaters: (state, data) => {
      state.chaters = data.payload;
    },
  
  },
});

export const { setToUserId, setChaters } = chatSlice.actions;
export default chatSlice.reducer;