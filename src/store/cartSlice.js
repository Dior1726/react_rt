import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: false,
};

const URL = 'https://course-api.com/react-useReducer-cart-project'

export const getCartItems = createAsyncThunk('cart/getCartItems', async (_, thunkAPI) => {
  try {
    const response = await axios(URL)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong')
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const id = action.payload
      state.cartItems = state.cartItems.filter(item => item.id !== id)
    },
    increase: (state, {payload}) => {
      const cartItem = state.cartItems.find(item => item.id === payload.id)
      cartItem.amount = cartItem.amount + 1 
    },
    decrease: (state, {payload}) => {
      const cartItem = state.cartItems.find(item => item.id === payload.id)
      cartItem.amount = cartItem.amount - 1 
    },
    calculateTotal: (state) => {
      let total = 0
      let amount = 0

      state.cartItems.forEach(item => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    }
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
       state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false
    }
  }
});

export const { clearCart, removeItem, decrease, increase, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;