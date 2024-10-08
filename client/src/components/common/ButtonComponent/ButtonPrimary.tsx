import React from 'react';
import { Button, ButtonProps as AntButtonProps } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   font-size: 14px;
   padding: 16px;
   min-height: 38px;
   font-weight: 500;
   line-height: 25px;
   color: var(--color-white);
   background-color: var(--color-blue-04);

   &:hover {
      color: var(--color-blue-03) !important;
      background-color: var(--color-white) !important;
      border: 1px solid var(--color-blue-03) !important;
   }
`;

interface PrimaryButtonProps extends AntButtonProps {
   label: string;
   icon?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
   label,
   icon,
   ...props
}) => {
   return (
      <StyledButton {...props} icon={icon}>
         <span
            style={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               textAlign: 'center',
            }}
         >
            {label}
         </span>
      </StyledButton>
   );
};

export default PrimaryButton;
