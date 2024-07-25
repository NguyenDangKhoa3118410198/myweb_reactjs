import { Button } from 'antd';
import styled from 'styled-components';
import { IButton } from '../Button';

const StyledButton = styled(Button)`
   border-radius: 10px;
   font-size: 14px;
   padding: 17px;
   background-color: var(--color-blue-04);

   &:hover {
      color: var(--color-blue-03) !important;
      background-color: var(--color-white) !important;
      border: 1px solid var(--color-blue-03) !important;
   }
`;

export default function PrimaryButton({ label, icon, ...props }: IButton) {
   return (
      <StyledButton type='primary' {...props} icon={icon}>
         {label}
      </StyledButton>
   );
}
