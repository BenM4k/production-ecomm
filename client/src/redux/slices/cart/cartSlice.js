import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const isDuplicate = state.some(
        (element) => element?._id === action.payload._id
      );
      if (isDuplicate) return;
      state.push(action.payload);
    },
    removeToCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    },
    itemCountPlus: (state, action) => {
      const item = state.find((item) => item._id === action.payload._id);
      item.itemCount += 1;
    },
    itemCountMinus: (state, action) => {
      const item = state.find((item) => item._id === action.payload._id);
      if (item.itemCount === 1) return;
      item.itemCount -= 1;
    },
    clearCart: () => {
      return [];
    },
  },
});

export const {
  addToCart,
  removeToCart,
  itemCountMinus,
  itemCountPlus,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
