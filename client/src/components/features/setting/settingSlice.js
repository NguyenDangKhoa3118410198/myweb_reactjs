import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   calendar: false,
   popup: false,
};

const settingSlice = createSlice({
   name: 'setting',
   initialState,
   reducers: {
      setSettingCalendar: (state, action) => {
         state.calendar = action.payload;
      },
   },
});

export const { setSettingCalendar } = settingSlice.actions;
export default settingSlice.reducer;
