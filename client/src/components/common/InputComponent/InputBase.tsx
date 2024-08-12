import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import styled from 'styled-components';

export interface IInputBase extends InputProps {
   placeholder?: string;
   type?: string;
   value?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled(Input)<InputProps>`
   border-radius: 14px;
   font-size: 14px;
   line-height: 120%;
   max-width: 502px;
   min-height: 38px;
   width: 100%;
`;

const InputBase: React.FC<IInputBase> = ({
   placeholder,
   type = 'text',
   ...props
}) => {
   return (
      <StyledInput
         type={type}
         placeholder={placeholder || 'Enter something'}
         {...props}
      />
   );
};

export default InputBase;
