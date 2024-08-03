import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import InputBase, { IInputBase } from './InputBase'; // Đảm bảo đường dẫn đúng với vị trí của InputBase

const InputPassword: React.FC<Omit<IInputBase, 'type'>> = ({
   placeholder = 'Password',
   value,
   onChange,
   ...props
}) => {
   const [showPassword, setShowPassword] = useState(false);

   return (
      <InputBase
         type={showPassword ? 'text' : 'password'}
         placeholder={placeholder}
         value={value}
         onChange={onChange}
         {...props}
         suffix={
            <span
               onClick={() => setShowPassword(!showPassword)}
               style={{ cursor: 'pointer' }}
            >
               {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
         }
      />
   );
};

export default InputPassword;
