
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../products/ProductSlice";
import authReducer from "../features/auth/authSlice"
export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth:authReducer,
  },
});