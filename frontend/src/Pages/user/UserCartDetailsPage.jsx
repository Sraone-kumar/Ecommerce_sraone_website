import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../Redux/cartSlice";
import UserCartDetailsPageComponent from "./components/UserCartDetailsPageComponent";
import api from "../../axiosbase";
export default function UserCartDetailsPage() {
  const { cartItems, cartSubtotal, itemsCount } = useSelector(
    (state) => state.cart
  );
  const { userInfo } = useSelector((state) => state.user);

  const getUser = async () => {
    const { data } = await api.get(`api/users/profile/${userInfo._id}`);
    return data;
  };
  const reduxDispatch = useDispatch();

  const createOrder = async (orderData) => {
    const { data } = await api.post("/api/orders", { ...orderData });
    return data;
  };

  console.log(`cart items details page ${JSON.stringify(cartItems)}`);
  return (
    <UserCartDetailsPageComponent
      createOrder={createOrder}
      addToCart={addToCart}
      cartItems={cartItems}
      userInfo={userInfo}
      itemsCount={itemsCount}
      getUser={getUser}
      cartSubtotal={cartSubtotal}
      removeFromCart={removeFromCart}
      reduxDispatch={reduxDispatch}
    />
  );
}
