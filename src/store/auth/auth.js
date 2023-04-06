import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
  isRecruiter: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setAuth, setToken } = authSlice.actions;
export default authSlice.reducer;
