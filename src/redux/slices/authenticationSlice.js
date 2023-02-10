import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const initialState = {
  isAuthenticated: false,
  role: null,
  accessToken: null,
};
export const authSlice = createSlice({
  initialState,
  name: "authentication",
  reducers: {
    invalidateAuthentication: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.accessToken = null;
      return state;
    },
    updateAuthentication: (state, action) => {
      console.log(action.payload);
      state.isAuthenticated = action.payload.isAuthenticated;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
    },
  },
});
export const authenticationSelector = (state) => state.authentication;
export const { invalidateAuthentication, updateAuthentication } =
  authSlice.actions;
export default authSlice.reducer;
