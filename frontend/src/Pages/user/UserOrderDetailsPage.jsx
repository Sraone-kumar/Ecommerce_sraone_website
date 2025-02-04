import api from "../../axiosbase";
import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";
import { useSelector } from "react-redux";

export default function UserOrderDetailsPage() {
  const { userInfo } = useSelector((state) => state.user);
  const getUser = async () => {
    const { data } = await api.get("api/users/profile/" + userInfo._id);
    return data;
  };
  const getOrder = async (orderId) => {
    const { data } = await api.get("api/orders/user/" + orderId);
    return data;
  };
  return (
    <UserOrderDetailsPageComponent
      getOrder={getOrder}
      userInfo={userInfo}
      getUser={getUser}
    />
  );
}
