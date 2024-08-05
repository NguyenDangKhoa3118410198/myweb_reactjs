import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './menu.css';

function MenuItem({ title, to, icon }) {
   const darkMode = useSelector((state) => state.darkMode);

   return (
      <NavLink className={`menuItem ${darkMode ? 'darkmode' : ''}`} to={to}>
         <span className='icon icon-sidebar-menu'>{icon}</span>
         <span className='item'>{title}</span>
      </NavLink>
   );
}
export default MenuItem;
