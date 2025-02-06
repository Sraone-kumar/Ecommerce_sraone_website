import { useDispatch, useSelector } from "react-redux";
import CartPageComponent from "./components/CartPageComponent";
import { addToCart, removeFromCart } from "../Redux/cartSlice";

export default function CartPage() {
  const { cartItems, cartSubtotal } = useSelector((state) => state.cart);
  const reduxDispatch = useDispatch();

  return (
    <CartPageComponent
      addToCart={addToCart}
      cartItems={cartItems}
      cartSubtotal={cartSubtotal}
      removeFromCart={removeFromCart}
      reduxDispatch={reduxDispatch}
    />
  );
}
