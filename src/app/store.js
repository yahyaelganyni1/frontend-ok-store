import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import productsReducer from '../features/products/productsSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authentication: authenticationReducer,
    products: productsReducer,
  },
});
