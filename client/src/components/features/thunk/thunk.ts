import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { sendRequest } from 'ulti/sendHeaderRequest';

type HandleAsyncThunkParams<S, T> = {
   builder: any; // Thay thế với kiểu cụ thể nếu có
   thunk: any; // Thay thế với kiểu cụ thể nếu có
   successCallback: (state: any, action: PayloadAction<T>) => void;
   stateSelector: (state: S) => any;
};

export const handleAsyncThunk = <S, T>({
   builder,
   thunk,
   successCallback,
   stateSelector,
}: HandleAsyncThunkParams<S, T>) => {
   builder
      .addCase(thunk.pending, (state: S) => {
         const selectedState = stateSelector(state);
         if (selectedState) {
            selectedState.status = 'loading';
         }
      })
      .addCase(thunk.fulfilled, (state: S, action: PayloadAction<T>) => {
         const selectedState = stateSelector(state);
         if (selectedState) {
            selectedState.status = 'succeeded';
            successCallback(selectedState, action);
         } else {
            console.error('Selected state is undefined');
         }
      })
      .addCase(thunk.rejected, (state: S, action: any) => {
         const selectedState = stateSelector(state);
         if (selectedState) {
            selectedState.status = 'failed';
            selectedState.error = action.error.message || 'Unknown error';
         } else {
            console.error('Selected state is undefined');
         }
      });
};

// Fetch reviews
export const fetchReviewProduct = createAsyncThunk<
   { reviews: any },
   string,
   { rejectValue: string }
>('root/fetchReviewProduct', async (productId, { rejectWithValue }) => {
   try {
      const data = await sendRequest('GET', `api/products/${productId}/review`);
      return { reviews: data };
   } catch (error: any) {
      return rejectWithValue(error.message);
   }
});

export const fetchReviewOrder = createAsyncThunk<
   { reviewByOrderId: any },
   string,
   { rejectValue: string }
>('root/fetchReviewOrder', async (orderId, { rejectWithValue }) => {
   try {
      const data = await sendRequest('GET', `api/orders/${orderId}/detail`);
      return { reviewByOrderId: data };
   } catch (error: any) {
      return rejectWithValue(error.message);
   }
});

// Fetch products
export const fetchProducts = createAsyncThunk(
   'root/fetchProducts',
   async (
      {
         page,
         limit,
         searchTerm,
      }: { page: number; limit: number; searchTerm?: string },
      { rejectWithValue }
   ) => {
      try {
         const params = getParamURL(page, limit, searchTerm);
         const data = await sendRequest('GET', `api/products?${params}`);
         return {
            products: data.data,
            totalPages: data.pagination.totalPages,
            // page: data.pagination.page,
         };
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

// Fetch orders
export const fetchOrders = createAsyncThunk(
   'root/fetchOrders',
   async (
      {
         page,
         limit,
         searchTerm,
      }: { page: number; limit: number; searchTerm?: string },
      { rejectWithValue }
   ) => {
      try {
         const params = getParamURL(page, limit, searchTerm);
         const data = await sendRequest('GET', `api/orders?${params}`);
         return {
            orders: data.data,
            totalPages: data.pagination.totalPages,
            // page: data.pagination.page,
         };
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchUsers = createAsyncThunk(
   'root/fetchUsers',
   async (
      {
         page,
         limit,
         searchTerm,
      }: { page: number; limit: number; searchTerm?: string },
      { rejectWithValue }
   ) => {
      try {
         const params = getParamURL(page, limit, searchTerm);
         const data = await sendRequest('GET', `api/users?${params}`);
         return {
            users: data.data,
            totalPages: data.pagination.totalPages,
         };
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchCustomers = createAsyncThunk(
   'root/fetchCustomers',
   async (
      {
         page,
         limit,
         searchTerm,
      }: { page: number; limit: number; searchTerm?: string },
      { rejectWithValue }
   ) => {
      try {
         const params = getParamURL(page, limit, searchTerm);
         const data = await sendRequest('GET', `api/customers?${params}`);
         return {
            customers: data.data,
            totalPages: data.pagination.totalPages,
         };
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchUserDetail = createAsyncThunk(
   'root/fetchUserDetail',
   async (
      {
         page,
         limit,
         searchTerm,
      }: { page: number; limit: number; searchTerm?: string },
      { rejectWithValue }
   ) => {
      try {
         const params = getParamURL(page, limit, searchTerm);
         const data = await sendRequest('GET', `api/userDetail?${params}`);
         return {
            userDetails: data.data,
            totalPages: data.pagination.totalPages,
         };
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

const getParamURL = (page: number, limit: number, searchTerm?: string) => {
   const params = new URLSearchParams();

   if (searchTerm) {
      params.append('search', searchTerm);
   }

   params.append('page', page.toString());
   params.append('limit', limit.toString());

   return params.toString();
};
