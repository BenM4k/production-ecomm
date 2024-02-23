import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./redux/store";
import "./index.scss";

import { orderApiSlice } from "./redux/slices/order/orderSlice.js";
import { categoryApiSlice } from "./redux/slices/category/category";
import { productApiSlice } from "./redux/slices/products/productSlice";
import { reviewsApiSlice } from "./redux/slices/review/reviewSlice.js";
// import { testimonialSlice } from './redux/slices/testimonials/testimonials'

store.dispatch(categoryApiSlice.endpoints.getCategories.initiate());
store.dispatch(productApiSlice.endpoints.getProducts.initiate());
store.dispatch(orderApiSlice.endpoints.getOrders.initiate());
store.dispatch(reviewsApiSlice.endpoints.getReviews.initiate());
// store.dispatch(testimonialSlice.endpoints.getTestimonials.initiate());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
