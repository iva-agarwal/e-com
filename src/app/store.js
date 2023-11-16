
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../products/ProductSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});