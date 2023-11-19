// productsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchAllProducts, fetchProductsByFilters} from "./ProductAPI";

// Define the initial state
const initialState = {
  products: [],
  status: "idle",
  error: null,
};

// Define the async thunk for fetching products
export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "products/fetchProductsByFilters",
  async (filter,sort) => {
    const response = await fetchProductsByFilters(filter,sort);
    return response.data;
  }
);


// Create the products slice of the Redux store
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
  },
});

export default productsSlice.reducer;
export const { } = productsSlice.actions;  // No actions defined in this example