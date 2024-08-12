import SwitchCustom from 'components/common/Switch';
import {
   setSettingCalendar,
   setSettingProgressChart,
   setSettingTodolist,
   setSettingTopRevenue,
} from 'components/features/setting/settingSlice';
import { RootState } from 'components/features/store';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

interface IGeneralSetting {}

const GeneralSetting: React.FC<IGeneralSetting> = () => {
   const dispatch = useAppDispatch();
   const { calendar, topRevenue, todolist, progressChart } = useSelector(
      (state: RootState) => state.setting
   );

   const handleCheckboxChange = (label: string) => {
      if (label === 'calendar') dispatch(setSettingCalendar(!calendar));
      if (label === 'topRevenue') dispatch(setSettingTopRevenue(!topRevenue));
      if (label === 'todolist') dispatch(setSettingTodolist(!todolist));
      if (label === 'progressChart')
         dispatch(setSettingProgressChart(!progressChart));
   };

   return (
      <>
         <SettingTitle>Dashboard Options</SettingTitle>
         <SettingListWrapperStyled>
            <div className='setting-item'>
               <SwitchCustom
                  handleFunction={() => handleCheckboxChange('calendar')}
                  isChecked={calendar}
                  label='Calendar'
                  title='Enable calendar table'
               />
            </div>
            <div className='setting-item'>
               <SwitchCustom
                  handleFunction={() => handleCheckboxChange('topRevenue')}
                  isChecked={topRevenue}
                  label='Top Revenue'
                  title='Enable top revenue'
               />
            </div>
            <div className='setting-item'>
               <SwitchCustom
                  handleFunction={() => handleCheckboxChange('todolist')}
                  isChecked={todolist}
                  label='Todolist'
                  title='Enable todolist'
               />
            </div>
            <div className='setting-item'>
               <SwitchCustom
                  handleFunction={() => handleCheckboxChange('progressChart')}
                  isChecked={progressChart}
                  label='Progess Chart'
                  title='Enable progess chart'
               />
            </div>
         </SettingListWrapperStyled>
      </>
   );
};

const SettingListWrapperStyled = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 30px;
`;

const SettingTitle = styled.h1`
   font-size: 30px;
   font-weight: 700;
`;

export default GeneralSetting;
