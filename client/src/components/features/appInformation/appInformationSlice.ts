import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppInformationState {
   dataUsers: number;
   dataOrders: number;
   dataProducts: number;
   dataAccess: number;
}

const initialState: AppInformationState = {
   dataUsers: 0,
   dataOrders: 0,
   dataProducts: 0,
   dataAccess: 0,
};

const appInformationSlice = createSlice({
   name: 'appInformation',
   initialState,
   reducers: {
      setDataUsers: (state, action: PayloadAction<number>) => {
         state.dataUsers = action.payload;
      },
      updateCountingUsers: (state) => {
         state.dataUsers += 1;
      },
      setDataOrders: (state, action: PayloadAction<number>) => {
         state.dataOrders = action.payload;
      },
      setDataProducts: (state, action: PayloadAction<number>) => {
         state.dataProducts = action.payload;
      },
      setDataAccess: (state, action: PayloadAction<number>) => {
         state.dataAccess = action.payload;
      },
   },
});

export const {
   setDataUsers,
   updateCountingUsers,
   setDataOrders,
   setDataProducts,
   setDataAccess,
} = appInformationSlice.actions;

export default appInformationSlice.reducer;

export type { AppInformationState };
