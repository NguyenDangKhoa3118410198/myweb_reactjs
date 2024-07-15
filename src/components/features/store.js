import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './darkmode/darkModeSlice';
import appInformationReducer from './appInformation/appInformationSlice';
import loadingReducer from './loading/loadingSlice';
import settingReducer from './setting/settingSlice';

const store = configureStore({
   reducer: {
      darkMode: darkModeReducer,
      appInformation: appInformationReducer,
      loading: loadingReducer,
      setting: settingReducer,
   },
});

export default store;
