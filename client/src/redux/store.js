import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "./api/apiSlice";
import cartSlice from "./slices/cart/cartSlice";
import authSlice from "./slices/users/userSlice";
import notificationSlice from "./slices/notifications/notif";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    auth: authSlice,
    notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
