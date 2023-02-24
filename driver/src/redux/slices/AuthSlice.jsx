import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  userId: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state) => {
      state.authenticated = true;
    },
    unAuthenticate: (state) => {
      state.authenticated = false;
    },
    setUserId : (state, data) => {
      state.userId = data.payload;
    }
  },
});

export const { authenticate, unAuthenticate, setUserId } = authSlice.actions;

export default authSlice.reducer;
