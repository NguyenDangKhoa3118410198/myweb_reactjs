import React, { ReactNode } from 'react';
import './NullLayout.css';

interface INullLayout {
   children: ReactNode;
}

const NullLayout: React.FC<INullLayout> = ({ children }) => {
   return <div className='null-layout-container'>{children}</div>;
};

export default NullLayout;
