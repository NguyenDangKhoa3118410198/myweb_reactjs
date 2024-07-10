import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './darkmode/darkModeSlice';
import appInformationReducer from './appInformation/appInformationSlice';
import loadingReducer from './loading/loadingSlice';

const store = configureStore({
   reducer: {
      darkMode: darkModeReducer,
      appInformation: appInformationReducer,
      loading: loadingReducer,
   },
});

export default store;
