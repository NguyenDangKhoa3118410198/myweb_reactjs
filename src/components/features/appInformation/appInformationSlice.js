import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   dataUsers: 0,
   dataOrders: 0,
   dataProducts: 0,
   dataAccess: 0,
};

const appInformationSlice = createSlice({
   name: 'appInformation',
   initialState,
   reducers: {
      setDataUsers: (state, action) => {
         state.dataUsers = action.payload;
      },
      updateCountingUsers: (state, action) => {
         state.dataUsers += 1;
      },
      setDataOrders: (state, action) => {
         state.dataOrders = action.payload;
      },
      setDataProducts: (state, action) => {
         state.dataProducts = action.payload;
      },
      setDataAccess: (state, action) => {
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
