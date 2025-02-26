import { Outlet, Navigate, useNavigate } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";
import { useEffect, useState } from "react";
import LoginPage from "../Pages/LoginPage";
import api from "../axiosbase";
import { useDispatch } from "react-redux";
import { userLogout } from "../Redux/userSlice";

export default function ProtectedRoutesComponent({ admin }) {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("api/get-token")
        .then((res) => {
          setIsAuth(res.data.token);

          // return isAuth;
        })
        .catch((error) => {
          console.log(error);
          dispatch(userLogout());
          navigate("/login");
        });
    };

    fetchData();
  }, [navigate]);

  if (isAuth && admin && isAuth !== "admin") {
    return <Navigate to={"/login"} />;
  } else if (isAuth && admin) {
    return <Outlet />;
  } else if (isAuth && !admin) {
    return (
      <>
        <Outlet />
        <UserChatComponent />
      </>
    );
  } else {
    <Navigate to={"/login"} />;
  }
}
