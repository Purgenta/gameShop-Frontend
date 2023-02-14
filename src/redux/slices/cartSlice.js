import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
let cart = localStorage.getItem("cart");
if (cart) {
  cart = JSON.parse(cart);
} else {
  cart = {};
}
export const saveCart = createAsyncThunk("cart/saveCart", async () => {
  await Promise.resolve();
});
const calculateDifferentItems = (cart) => Object.keys(cart).length;
const cartSlice = createSlice({
  name: "cart",
  initialState: { cart, differentItems: calculateDifferentItems(cart) },
  reducers: {
    addCartItem: {
      reducer: (state, action) => {
        const itemId = action.payload.itemId;
        if (state.cart.hasOwnProperty(action.payload.itemId)) {
          state.cart[`${itemId}`]["quantity"] += 1;
        } else {
          state.cart[`${itemId}`] = {};
          state.cart[`${itemId}`]["quantity"] = 1;
          state.cart[`${itemId}`].gameId = itemId;
          state.differentItems = calculateDifferentItems(state.cart);
        }
        return state;
      },
      prepare: (itemId) => {
        return { payload: { itemId } };
      },
    },
    removeCartItem: {
      reducer: (state, action) => {
        const itemId = action.payload.itemId;
        delete state.cart[`${itemId}`];
        state.differentItems = calculateDifferentItems(state.cart);
        return state;
      },
      prepare: (itemId) => {
        return { payload: { itemId } };
      },
    },
    updateQuantity: {
      reducer: (state, action) => {
        const { itemId, quantity } = action.payload;
        state.cart[`${itemId}`].quantity += quantity;
        if (state.cart[`${itemId}`].quantity <= 0) {
          delete state.cart[`${itemId}`];
        }
        return state;
      },
      prepare: (itemId, quantity) => {
        return { payload: { itemId, quantity } };
      },
    },
  },
  extraReducers(builder) {
    builder.addCase(saveCart.fulfilled, (state, action) => {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    });
  },
});
export default cartSlice.reducer;
export const selectCartItemCount = (state) => {
  return state.cart.differentItems;
};
export const selectCart = (state) => {
  return state.cart.cart;
};
export const { updateQuantity, removeCartItem, addCartItem } =
  cartSlice.actions;
