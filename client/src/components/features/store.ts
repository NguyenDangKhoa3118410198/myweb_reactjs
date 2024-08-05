import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './darkmode/darkModeSlice';
import appInformationReducer from './appInformation/appInformationSlice';
import loadingReducer from './loading/loadingSlice';
import settingReducer from './setting/settingSlice';
import rootReducer from './root/rootSlice';

const store = configureStore({
   reducer: {
      darkMode: darkModeReducer,
      appInformation: appInformationReducer,
      loading: loadingReducer,
      setting: settingReducer,
      root: rootReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
