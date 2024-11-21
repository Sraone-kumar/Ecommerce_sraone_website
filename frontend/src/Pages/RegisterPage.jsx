import RegisterPageComponent from "./components/RegisterPageComponent";
import { userRegisterLoginDetails } from "../Redux/userSlice";
import { useDispatch } from "react-redux";

import api from "../axiosbase";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();
  const registerUserApiReq = async (name, lastName, email, password) => {
    const { data } = await api.post("/api/users/register", {
      name,
      lastName,
      email,
      password,
    });
    console.log(data);
    sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
    if (data.success === "User created") {
      navigate("/user/profile");
    }
    return data;
  };

  return (
    <RegisterPageComponent
      reduxDispatch={reduxDispatch}
      registerUserApiReq={registerUserApiReq}
      setReduxUserState={userRegisterLoginDetails}
    />
  );
}
