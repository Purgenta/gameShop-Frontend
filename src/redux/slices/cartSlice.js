import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
let cart = localStorage.getItem("cart");
if (cart) {
  cart = JSON.parse(cart);
} else {
  cart = {};
}
export const saveCart = createAsyncThunk("cart/saveCart", async () => {
  const response = await Promise.resolve();
});
const differentItems = Object.keys(cart).length;
const cartSlice = createSlice({
  name: "cart",
  initialState: { cart, differentItems },
  reducers: {
    addCartItem: {
      reducer: (state, action) => {
        const itemId = action.payload.itemId;
        if (state.cart.hasOwnProperty(action.payload.itemId)) {
          state.cart[`${itemId}`] += 1;
        } else {
          state.differentItems += 1;
          state.cart[`${itemId}`] = 1;
        }
        return state;
      },
      prepare: (itemId) => {
        return { payload: { itemId } };
      },
    },
    removeCartItem: (state, action) => {
      const itemId = action.payload.itemId;
      delete state.cart[`${itemId}`];
      state.differentItems -= 1;
      return state;
    },
    removeAllCartItems: (state, action) => {},
    addCartItems: (state, action) => {},
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
export const { removeAllCartItems, removeCartItem, addCartItem, addCartItems } =
  cartSlice.actions;
