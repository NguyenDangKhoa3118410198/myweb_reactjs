import React from 'react';
import { Button, ButtonProps as AntButtonProps } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
   border-radius: 10px;
   font-size: 14px;
   padding: 16px;
   color: var(--color-blue-04);
   background-color: var(--color-white);
   border: 1px solid var(--color-blue-03) !important;

   &:hover {
      color: var(--color-blue-03) !important;
      background-color: var(--color-white) !important;
      border: 1px solid var(--color-blue-03) !important;
   }
`;

interface CancelButtonProps extends AntButtonProps {
   label: string;
   icon?: React.ReactNode;
}

const CancelButton: React.FC<CancelButtonProps> = ({
   label,
   icon,
   ...props
}) => {
   return (
      <StyledButton {...props} icon={icon}>
         {label}
      </StyledButton>
   );
};

export default CancelButton;
