import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './darkmode/darkModeSlice';
import appInformationReducer from './appInformation/appInformationSlice';

const store = configureStore({
   reducer: {
      darkMode: darkModeReducer,
      appInformation: appInformationReducer,
   },
});

export default store;
