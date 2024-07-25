import { Switch, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface ISwitch {
   handleFunction?: any;
   isChecked?: boolean;
   title?: string;
   label?: string;
}

const SwitchCustom: React.FC<ISwitch> = ({
   handleFunction,
   isChecked,
   title,
   label,
   ...props
}) => {
   return (
      <SwitchStyled>
         {label && <Label>{label}</Label>}
         <Switch
            onChange={handleFunction}
            checked={isChecked}
            size='small'
            {...props}
         />
         {title && (
            <Tooltip title={title}>
               <QuestionCircleOutlined
                  style={{ color: 'green', fontSize: '14px' }}
               />
            </Tooltip>
         )}
      </SwitchStyled>
   );
};

export default SwitchCustom;

const SwitchStyled = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   gap: 5px;
`;

const Label = styled.span`
   margin-right: 2px;
`;
