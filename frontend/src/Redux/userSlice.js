import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

const initialState = {
  userInfo: userInfoFromLocalStorage,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegisterLoginDetails: (state = initialState, action) => {
      state.userInfo = action.payload;
    },
    userLogout: (state = initialState) => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cart");
      sessionStorage.removeItem("userInfo");
      axios.get("/api/logout");
      state = {};
      document.location.href = "/login";
    },
  },
});

export const { userRegisterLoginDetails, userLogout } = userSlice.actions;

export default userSlice.reducer;
