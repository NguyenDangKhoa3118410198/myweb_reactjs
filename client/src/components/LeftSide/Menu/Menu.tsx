import { ReactNode } from 'react';
import './menu.css';

interface IMenu {
   children: ReactNode;
}

const Menu: React.FC<IMenu> = ({ children }) => {
   return <nav className='menu'>{<>{children}</>}</nav>;
};

export default Menu;
