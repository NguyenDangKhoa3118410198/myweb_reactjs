import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingState {
   calendar: boolean;
   topRevenue: boolean;
   todolist: boolean;
   progressChart: boolean;
}

const initialState: SettingState = {
   calendar: false,
   topRevenue: true,
   todolist: true,
   progressChart: true,
};

const settingSlice = createSlice({
   name: 'setting',
   initialState,
   reducers: {
      setSettingCalendar: (state, action: PayloadAction<boolean>) => {
         state.calendar = action.payload;
      },

      setSettingTopRevenue: (state, action: PayloadAction<boolean>) => {
         state.topRevenue = action.payload;
      },

      setSettingTodolist: (state, action: PayloadAction<boolean>) => {
         state.todolist = action.payload;
      },

      setSettingProgressChart: (state, action: PayloadAction<boolean>) => {
         state.progressChart = action.payload;
      },
   },
});

export const {
   setSettingCalendar,
   setSettingTopRevenue,
   setSettingTodolist,
   setSettingProgressChart,
} = settingSlice.actions;
export default settingSlice.reducer;

export type { SettingState };
