import { createSlice } from '@reduxjs/toolkit';

// Định nghĩa kiểu cho trạng thái
type DarkModeState = boolean;

const initialState: DarkModeState = false;

const darkModeSlice = createSlice({
   name: 'darkMode',
   initialState,
   reducers: {
      toggleDarkMode: (state) => {
         return !state;
      },
   },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;

// Xuất kiểu trạng thái
export type { DarkModeState };
