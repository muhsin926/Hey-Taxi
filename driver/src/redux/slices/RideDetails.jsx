import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rideDetails: {},
    direction: false
};

const rideDetailsSlice = createSlice({
  name: "rideDetails",
  initialState,
  reducers: {
    setRideDetails: (state, data) => {
      state.rideDetails = data.payload;
    },
    setDirection : (state) => {
        state.direction = true
    }
  },
});

export const { setRideDetails,setDirection } = rideDetailsSlice.actions;
export default rideDetailsSlice.reducer;