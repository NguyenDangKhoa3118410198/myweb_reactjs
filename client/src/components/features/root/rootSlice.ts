import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
   fetchOrders,
   fetchProducts,
   fetchReviewProduct,
   handleAsyncThunk,
} from '../thunk/thunk';

interface ReviewState {
   reviewId: number | null;
   reviews: any[];
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   error: string | null;
}

interface ProductState {
   productId: number | null;
   products: any[];
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   error: string | null;
}

interface OrderState {
   orderId: number | null;
   orders: any[];
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   error: string | null;
}

interface RootStateSlice {
   loading: boolean;
   review: ReviewState;
   product: ProductState;
   order: OrderState;
}

const initialState: RootStateSlice = {
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
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload;
      },
   },
   extraReducers: (builder) => {
      handleAsyncThunk({
         builder,
         thunk: fetchReviewProduct,
         successCallback: (state: ReviewState, action: PayloadAction<any>) => {
            state.reviews = action.payload.reviews;
         },
         stateSelector: (state: RootStateSlice) => state.review,
      });

      handleAsyncThunk({
         builder,
         thunk: fetchProducts,
         successCallback: (state: ProductState, action: PayloadAction<any>) => {
            state.products = action.payload.products;
         },
         stateSelector: (state: RootStateSlice) => state.product,
      });

      handleAsyncThunk({
         builder,
         thunk: fetchOrders,
         successCallback: (state: OrderState, action: PayloadAction<any>) => {
            state.orders = action.payload.orders;
         },
         stateSelector: (state: RootStateSlice) => state.order,
      });
   },
});

export const { setLoading } = rootSlice.actions;
export default rootSlice.reducer;

export type { RootStateSlice };
