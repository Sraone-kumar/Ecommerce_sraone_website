import LoginPageComponent from "./components/LoginPageComponent";
import { userRegisterLoginDetails } from "../Redux/userSlice";
import { useDispatch } from "react-redux";
import api from "../axiosbase";

const loginUserRequest = async (email, password, keepMeSignedIn) => {
  const { data } = await api.post("/api/users/login", {
    email,
    password,
    keepMeSignedIn,
  });
  if (data.userLoggedIn.keepMeSignedIn)
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  return data;
};

export default function LoginPage() {
  const dispatch = useDispatch();

  return (
    <LoginPageComponent
      loginUserRequest={loginUserRequest}
      reduxDispatch={dispatch}
      userRegisterLoginRedux={userRegisterLoginDetails}
    />
  );
}
