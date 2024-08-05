import React, { ReactNode } from 'react';
import './globalStyle.css';

interface GlobalStyleProps {
   children: ReactNode;
}

const GlobalStyle: React.FC<GlobalStyleProps> = ({ children }) => {
   return <>{children}</>;
};

export default GlobalStyle;
