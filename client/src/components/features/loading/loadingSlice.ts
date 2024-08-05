import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoadingState = boolean;

const initialState: LoadingState = false;

const loadingSlice = createSlice({
   name: 'loading',
   initialState,
   reducers: {
      setLoading: (state, action: PayloadAction<LoadingState>) => {
         return action.payload;
      },
   },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

export type { LoadingState };
