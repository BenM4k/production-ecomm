import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import store from './redux/store'
import './index.scss';

// import { bannerApiSlice } from './redux/slices/banners/banners';
// import { categoryApiSlice } from './redux/slices/category/category';
import { productApiSlice } from './redux/slices/products/productSlice';
// import { testimonialSlice } from './redux/slices/testimonials/testimonials'

// store.dispatch(bannerApiSlice.endpoints.getBanners.initiate());
// store.dispatch(categoryApiSlice.endpoints.getCategories.initiate());
store.dispatch(productApiSlice.endpoints.getProducts.initiate());
// store.dispatch(testimonialSlice.endpoints.getTestimonials.initiate());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
