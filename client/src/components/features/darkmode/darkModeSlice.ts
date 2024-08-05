import { createSlice } from '@reduxjs/toolkit';

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

export type { DarkModeState };
