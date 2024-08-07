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

// Fetch products
export const fetchProducts = createAsyncThunk(
   'root/fetchProducts',
   async (_, { rejectWithValue }) => {
      try {
         const data = await sendRequest('GET', 'api/products');
         return { products: data };
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

// Fetch orders
export const fetchOrders = createAsyncThunk(
   'root/fetchOrders',
   async (_, { rejectWithValue }) => {
      try {
         const data = await sendRequest('GET', 'api/orders');
         return { orders: data };
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchUsers = createAsyncThunk(
   'root/fetchUsers',
   async (_, { rejectWithValue }) => {
      try {
         const data = await sendRequest('GET', 'api/users');
         return { users: data };
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchCustomers = createAsyncThunk(
   'root/fetchCustomers',
   async (_, { rejectWithValue }) => {
      try {
         const data = await sendRequest('GET', 'api/customers');
         return { customers: data };
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const fetchUserDetail = createAsyncThunk(
   'root/fetchUserDetail',
   async (_, { rejectWithValue }) => {
      try {
         const data = await sendRequest('GET', 'api/userDetail');
         return { userDetails: data };
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);
