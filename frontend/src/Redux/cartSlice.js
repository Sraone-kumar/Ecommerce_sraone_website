import { createSlice } from "@reduxjs/toolkit";

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  cartItems: cartItemsInLocalStorage,
  itemsCount: cartItemsInLocalStorage
    ? cartItemsInLocalStorage.reduce(
        (quantity, item) => Number(item.quantity) + quantity,
        0
      )
    : 0,
  cartSubtotal: cartItemsInLocalStorage
    ? cartItemsInLocalStorage.reduce(
        (sum, item) => Number(item.quantity * item.price) + sum,
        0
      )
    : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productID, name, price, image, count, quantity } = action.payload;

      const productExistsInState = state.cartItems.find(
        (product) => product.productID === productID
      );

      if (productExistsInState) {
        state.itemsCount -= Number(productExistsInState.quantity);
        state.cartSubtotal -= Number(
          productExistsInState.quantity * productExistsInState.price
        );
        state.itemsCount += Number(quantity);
        state.cartSubtotal += Number(quantity * productExistsInState.price);
        state.cartItems.forEach((product) => {
          if (product.productID === productID) {
            product.quantity = quantity;
          }
        });
      } else {
        state.cartItems.push({
          productID,
          name,
          price,
          image,
          count,
          quantity,
        });
        state.itemsCount += quantity;
        state.cartSubtotal += quantity * price;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));

      // state.products.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
