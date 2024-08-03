import React from 'react';
import InputBase, { IInputBase } from './InputBase';

const InputText: React.FC<Omit<IInputBase, 'type'>> = (props) => {
   return <InputBase type='text' {...props} />;
};

export default InputText;
