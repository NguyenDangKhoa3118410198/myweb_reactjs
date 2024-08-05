import { createSlice } from '@reduxjs/toolkit';
import {
   fetchOrders,
   fetchProducts,
   fetchReviewProduct,
   handleAsyncThunk,
} from '../thunk/thunk';

const initialState = {
   loading: false,
   review: {
      reviewId: null,
      reviews: [],
      status: 'idle',
      error: null,
   },
   product: {
      productId: null,
      products: [],
      status: 'idle',
      error: null,
   },
   order: {
      orderId: null,
      orders: [],
      status: 'idle',
      error: null,
   },
};

const rootSlice = createSlice({
   name: 'root',
   initialState,
   reducers: {
      setLoading: (state, action) => {
         state.loading = action.payload;
      },
   },
   extraReducers: (builder) => {
      handleAsyncThunk(
         builder, // tao 3 trang thai
         fetchReviewProduct, //ham goi API
         (state, action) => {
            state.reviews = action.payload.reviews; // neu call API thi set du lieu
         },
         (state) => state.review
      );
      handleAsyncThunk(
         builder,
         fetchProducts,
         (state, action) => {
            state.products = action.payload.products;
         },
         (state) => state.product
      );
      handleAsyncThunk(
         builder,
         fetchOrders,
         (state, action) => {
            state.orders = action.payload.orders;
         },
         (state) => state.order
      );
   },
});

export const { setLoading, getListReview, getListProduct, getListOrder } =
   rootSlice.actions;
export default rootSlice.reducer;
