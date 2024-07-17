import SwitchCustom from 'components/common/Switch';
import React from 'react';
import styled from 'styled-components';

interface IGeneralSetting {
   handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   calendar: boolean;
}

const GeneralSetting: React.FC<IGeneralSetting> = ({
   handleCheckboxChange,
   calendar,
}) => {
   return (
      <>
         <h1 className='setting-title'>Information</h1>
         <SettingListWrapperStyled>
            <div>
               <SwitchCustom
                  handleFunction={handleCheckboxChange}
                  isChecked={calendar}
                  label='Calendar'
                  title='Enable calendar table'
               />
            </div>
            <div>
               <SwitchCustom
                  handleFunction={handleCheckboxChange}
                  isChecked={calendar}
                  label='Calendar'
                  title='Enable calendar table'
               />
            </div>
            <div>
               <SwitchCustom
                  handleFunction={handleCheckboxChange}
                  isChecked={calendar}
                  label='Calendar'
                  title='Enable calendar table'
               />
            </div>
            <div>
               <SwitchCustom
                  handleFunction={handleCheckboxChange}
                  isChecked={calendar}
                  label='Calendar'
                  title='Enable calendar table'
               />
            </div>
         </SettingListWrapperStyled>
      </>
   );
};

const SettingListWrapperStyled = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
`;

export default GeneralSetting;
