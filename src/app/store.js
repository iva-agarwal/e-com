
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../products/ProductSlice";
import authReducer from "../features/auth/authSlice"
import cartReducer from '../features/cart/CartSlice'
import orderReducer from '../features/order/OrderSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth:authReducer,
    cart:cartReducer,
    order:orderReducer,
    user:userReducer,
  },
});