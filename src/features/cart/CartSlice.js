import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchItemsByUserId } from './CartAPI';

const initialState = {
  status: 'idle',
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    // You can add any other reducers as needed
    // ...

    // Update the addProductToCart reducer to handle adding complete product objects
    addProductToCart: (state, action) => {
      const { product } = action.payload;
      const existingProduct = state.items.find((item) => item.id === product.id);

      if (!existingProduct) {
        state.items.push(product);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // Instead of pushing the ID, dispatch the addProductToCart action with the complete product
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      });
  },
});

export const { addProductToCart } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;
export default cartSlice.reducer;
