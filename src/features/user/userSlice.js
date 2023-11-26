import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    try {
      const response = await fetch('http://localhost:8080/orders');
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);


export const userSlice = createSlice({
  name: 'counter',
  initialState,
  
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrders=(state)=> state.user.userOrders

export const { increment} = userSlice.actions;

export default userSlice.reducer;
