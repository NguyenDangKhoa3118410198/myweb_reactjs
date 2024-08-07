import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
   fetchCustomers,
   fetchOrders,
   fetchProducts,
   fetchReviewProduct,
   fetchUserDetail,
   fetchUsers,
   handleAsyncThunk,
} from '../thunk/thunk';

interface BaseState {
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   error: string | null;
}

interface UserState extends BaseState {
   userId: number | null;
   users: any[];
}

interface ReviewState extends BaseState {
   reviewId: number | null;
   reviews: any[];
}

interface ProductState extends BaseState {
   productId: number | null;
   products: any[];
}

interface OrderState extends BaseState {
   orderId: number | null;
   orders: any[];
}

interface CustomerState extends BaseState {
   customerId: number | null;
   customers: any[];
}

interface UserDetailState extends BaseState {
   userDetailId: number | null;
   userDetails: any[];
}

interface RootStateSlice {
   loading: boolean;
   review: ReviewState;
   product: ProductState;
   order: OrderState;
   user: UserState;
   customer: CustomerState;
   userDetail: UserDetailState;
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
   user: {
      userId: null,
      users: [],
      status: 'idle',
      error: null,
   },
   customer: {
      customerId: null,
      customers: [],
      status: 'idle',
      error: null,
   },
   userDetail: {
      userDetailId: null,
      userDetails: [],
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
      handleAsyncThunk({
         builder,
         thunk: fetchUsers,
         successCallback: (state: UserState, action: PayloadAction<any>) => {
            state.users = action.payload.users;
         },
         stateSelector: (state: RootStateSlice) => state.user,
      });
      handleAsyncThunk({
         builder,
         thunk: fetchCustomers,
         successCallback: (
            state: CustomerState,
            action: PayloadAction<any>
         ) => {
            state.customers = action.payload.customers;
         },
         stateSelector: (state: RootStateSlice) => state.customer,
      });
      handleAsyncThunk({
         builder,
         thunk: fetchUserDetail,
         successCallback: (
            state: UserDetailState,
            action: PayloadAction<any>
         ) => {
            state.userDetails = action.payload.userDetails;
         },
         stateSelector: (state: RootStateSlice) => state.userDetail,
      });
   },
});

export const { setLoading } = rootSlice.actions;
export default rootSlice.reducer;

export type { RootStateSlice };
