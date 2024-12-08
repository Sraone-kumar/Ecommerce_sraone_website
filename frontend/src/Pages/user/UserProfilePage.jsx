import UserProfilePageComponent from "./components/UserProfilePageComponent";
import { useSelector, useDispatch } from "react-redux";
import api from "../../axiosbase";
import { userRegisterLoginDetails } from "../../Redux/userSlice";

const updateUserApiRequest = async (
  name,
  lastName,
  phoneNumber,
  address,
  country,
  zipCode,
  city,
  state,
  password
) => {
  const { data } = await api.put("api/users/profile", {
    name,
    lastName,
    phoneNumber,
    address,
    country,
    zipCode,
    city,
    state,
    password,
  });

  // console.log(data);
  return data;
};

const fetchUser = async (user_id) => {
  const { data } = await api.get("/api/users/profile/" + user_id);
  // console.log(data);
  return data;
};

export default function UserProfilePage() {
  const { userInfo } = useSelector((state) => state.user);
  const reduxDispatch = useDispatch();

  return (
    <UserProfilePageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
      userInfo={userInfo}
      userInfoRedux={reduxDispatch}
      userRegisterLoginDetailsRedux={userRegisterLoginDetails}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}
    />
  );
}
