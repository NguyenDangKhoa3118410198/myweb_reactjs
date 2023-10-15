import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './darkmode/darkModeSlice';

const store = configureStore({
   reducer: {
      darkMode: darkModeReducer,
   },
});

export default store;
