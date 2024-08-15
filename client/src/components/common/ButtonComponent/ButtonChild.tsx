import React from 'react';
import { Button, ButtonProps as AntButtonProps } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
   border-radius: 10px;
   font-size: 14px;
   padding: 16px;
   color: var(--color-white);
   background-color: var(--color-blue-04);

   &:hover {
      color: var(--color-blue-03) !important;
      background-color: var(--color-white) !important;
      border: 1px solid var(--color-blue-03) !important;
   }
`;

interface ButtonChildProps extends AntButtonProps {
   label?: string;
   icon?: React.ReactNode;
   children?: React.ReactNode;
}

const ButtonChild: React.FC<ButtonChildProps> = ({
   label,
   icon,
   children,
   ...props
}) => {
   return (
      <StyledButton {...props} icon={icon}>
         {label && <span>{label}</span>}
         {children}
      </StyledButton>
   );
};

export default ButtonChild;
