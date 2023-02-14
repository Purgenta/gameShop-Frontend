import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from "./slices/authenticationSlice";
import cartSliceReducer from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    authentication: authenticationSliceReducer,
    cart: cartSliceReducer,
  },
});
