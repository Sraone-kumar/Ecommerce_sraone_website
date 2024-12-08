import { useDispatch, useSelector } from "react-redux";
import CartPageComponent from "./components/CartPageComponent";
import { addToCart } from "../Redux/cartSlice";

export default function CartPage() {
  const { cartItems, cartSubtotal } = useSelector((state) => state.cart);
  const reduxDispatch = useDispatch();

  return (
    <CartPageComponent
      addToCart={addToCart}
      cartItems={cartItems}
      cartSubtotal={cartSubtotal}
      reduxDispatch={reduxDispatch}
    />
  );
}
