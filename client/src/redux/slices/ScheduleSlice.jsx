import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scheduleDate: "",
  scheduleTime: "",
};

const scheduleSlice = createSlice({
  name: "scheduleRide",
  initialState,
  reducers: {
    setScheduleDate: (state, data) => {
      state.scheduleDate = data.payload;
    },
    setScheduleTime: (state, data) => {
      state.scheduleTime = data.payload;
    },
  },
});

export const { setScheduleDate, setScheduleTime } = scheduleSlice.actions;
export default scheduleSlice.reducer;
