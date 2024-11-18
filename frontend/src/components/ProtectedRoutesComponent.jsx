import { Outlet, Navigate, useNavigate } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";
import { useEffect, useState } from "react";
import LoginPage from "../Pages/LoginPage";
import axios from "axios";

export default function ProtectedRoutesComponent({ admin }) {
  const [isAuth, setIsAuth] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      await axios("api/get-token", {
        method: "GET",
        baseURL: "http://localhost:5173",
      })
        .then((res) => {
          setIsAuth(res.data.token);

          // return isAuth;
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };

    fetchData();
  }, [navigate]);

  // return isAuth && admin && isAuth !== "admin" ? (
  //   <Navigate to={"/login"} />
  // ) : isAuth && admin ? (
  //   <Outlet />
  // ) : isAuth && !admin ? (
  //   <>
  //     <UserChatComponent /> <Outlet />
  //   </>
  // ) : (
  //   <Navigate to={"/login"} />
  // );

  if (isAuth && admin && isAuth !== "admin") {
    console.log(1);
    console.log(isAuth);
    return <Navigate to={"/login"} />;
  } else if (isAuth && admin) {
    console.log(2);
    console.log(isAuth);
    return <Outlet />;
  } else if (isAuth && !admin) {
    console.log(3);
    console.log(isAuth);
    return (
      <>
        <Outlet />
        <UserChatComponent />
      </>
    );
  } else {
    console.log(4);
    console.log(isAuth);
    <Navigate to={"/login"} />;
  }
}
