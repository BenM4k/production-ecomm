import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "./api/apiSlice";
import cartSlice from "./slices/cart/cartSlice";
import searchSlice from "./slices/search/searchSlice";
import authSlice from "./slices/users/userSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    search: searchSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
