import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startPoint: "",
    endPoint: "",
};

const locationSlice = createSlice({
  name: "locationSlice",
  initialState,
  reducers: {
    setStartPoint: (state, data) => {
      state.startPoint = data.payload;
    },
    setEndPoint: (state, data) => {
      state.endPoint = data.payload;
    },
  },
});

export const { setStartPoint, setEndPoint } = locationSlice.actions;
export default locationSlice.reducer;