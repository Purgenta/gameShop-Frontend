import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from "./slices/authenticationSlice";
export const store = configureStore({
  reducer: {
    authentication: authenticationSliceReducer,
  },
});
