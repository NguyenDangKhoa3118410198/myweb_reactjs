import React from 'react';
import InputBase, { IInputBase } from './InputBase';

const InputEmail: React.FC<Omit<IInputBase, 'type'>> = (props) => {
   return <InputBase type='email' {...props} />;
};

export default InputEmail;
