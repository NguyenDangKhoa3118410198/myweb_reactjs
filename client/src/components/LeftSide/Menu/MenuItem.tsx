import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'components/features/store';
import './menu.css';

interface IMenuItem {
   title: string;
   to: string;
   icon: any;
}

const MenuItem: React.FC<IMenuItem> = ({ title, to, icon }) => {
   const darkMode = useSelector((state: RootState) => state.darkMode);

   return (
      <NavLink className={`menuItem ${darkMode ? 'darkmode' : ''}`} to={to}>
         <span className='icon icon-sidebar-menu'>{icon}</span>
         <span className='item'>{title}</span>
      </NavLink>
   );
};
export default MenuItem;
