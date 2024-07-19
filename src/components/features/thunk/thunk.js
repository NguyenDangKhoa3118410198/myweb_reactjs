import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendRequest } from 'ulti/sendHeaderRequest';

export const handleAsyncThunk = (
   builder,
   thunk,
   successCallback,
   stateSelector
) => {
   builder
      .addCase(thunk.pending, (state) => {
         const selectedState = stateSelector(state);
         selectedState.status = 'loading';
      })
      .addCase(thunk.fulfilled, (state, action) => {
         const selectedState = stateSelector(state);
         selectedState.status = 'succeeded';
         successCallback(selectedState, action);
      })
      .addCase(thunk.rejected, (state, action) => {
         const selectedState = stateSelector(state);
         selectedState.status = 'failed';
         selectedState.error = action.error.message;
      });
};

// Fetch reviews
export const fetchReviewProduct = createAsyncThunk(
   'root/fetchReviewProduct',
   async (productId, { rejectWithValue }) => {
      try {
         const data = await sendRequest(
            'GET',
            `api/products/${productId}/review`
         );
         return { reviews: data };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

// Fetch products
export const fetchProducts = createAsyncThunk(
   'root/fetchProducts',
   async (_, { rejectWithValue }) => {
      try {
         const data = await sendRequest('GET', 'api/products');
         return { products: data };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

// Fetch orders
export const fetchOrders = createAsyncThunk(
   'root/fetchOrders',
   async (_, { rejectWithValue }) => {
      try {
         const response = await fetch('api/orders');
         const data = await response.json();
         return { orders: data };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);
