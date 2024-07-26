import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import styled from 'styled-components';

export interface IInputText extends InputProps {
   placeholder?: string;
   type?: string;
   value?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const StyledInput = styled(Input)<InputProps>`
   border-radius: 14px;
   box-shadow: none;
   font-size: 14px;
   height: 40px;
   line-height: 120%;
   outline: none;
`;

export default function InputText({
   placeholder,
   type = 'text',
   value,
   onChange,
   ...props
}: IInputText) {
   return (
      <StyledInput
         type={type}
         placeholder={placeholder || 'Enter something'}
         value={value}
         onChange={onChange}
         {...props}
      />
   );
}
