import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
