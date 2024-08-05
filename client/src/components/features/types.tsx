import { DarkModeState } from './darkmode/darkModeSlice';
import { AppInformationState } from './appInformation/appInformationSlice';
import { LoadingState } from './loading/loadingSlice';
import { SettingState } from './setting/settingSlice';
import { RootStateSlice } from './root/rootSlice';

export interface RootState {
   darkMode: DarkModeState;
   appInformation: AppInformationState;
   loading: LoadingState;
   setting: SettingState;
   root: RootStateSlice;
}
