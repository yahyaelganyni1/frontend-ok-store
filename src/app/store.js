import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import productsReducer from '../features/products/productsSlice';
import shoppingcartReducer from '../features/shoppingcart/shoppingcartSlice';
import reviewsReducer from '../features/review/reviewSlice';
import categoriesReducer from '../features/category/categorySlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authentication: authenticationReducer,
    products: productsReducer,
    shoppingcart: shoppingcartReducer,
    reviews: reviewsReducer,
    categories: categoriesReducer,
  },
});
