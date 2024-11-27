import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/userSlice";
import cartReducer from "../Redux/cartSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
