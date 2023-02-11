import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
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
  },
});

export const { authenticate, unAuthenticate } = authSlice.actions;

export default authSlice.reducer;
