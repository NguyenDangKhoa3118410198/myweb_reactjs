import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingState {
   calendar: boolean;
   popup: boolean;
}

const initialState: SettingState = {
   calendar: false,
   popup: false,
};

const settingSlice = createSlice({
   name: 'setting',
   initialState,
   reducers: {
      setSettingCalendar: (state, action: PayloadAction<boolean>) => {
         state.calendar = action.payload;
      },

      setSettingPopup: (state, action: PayloadAction<boolean>) => {
         state.popup = action.payload;
      },
   },
});

export const { setSettingCalendar, setSettingPopup } = settingSlice.actions;
export default settingSlice.reducer;

export type { SettingState };
