import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import Menu, { MenuItem, MenuItemDropdown } from './Menu';
import './sidebar.css';
import Logo from '../../imgs/logo-react.svg';
import {
   UilEstate,
   UilClipboardAlt,
   UilUsersAlt,
   UilPackage,
} from '@iconscout/react-unicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../features/darkmode/darkModeSlice';

const Sidebar = ({ isMenuActive, toggleBurger, activeMenu }) => {
   const dispatch = useDispatch();
   const darkMode = useSelector((state) => state.darkMode);
   // eslint-disable-next-line no-unused-vars
   const dropdownLinks = [
      { title: 'All Customers', to: '/' },
      { title: 'Add Customer', to: '/customers' },
   ];

   const componentRef = useRef(null);

   useEffect(() => {
      function handleClickOutside(event) {
         if (
            componentRef.current &&
            !componentRef.current.contains(event.target)
         ) {
            activeMenu(false);
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [activeMenu]);

   return (
      <aside
         ref={componentRef}
         className={`side-menu ${isMenuActive ? 'open' : ''}`}
      >
         <div className={`sidebar ${darkMode ? 'isDark' : ''}`}>
            <header className={`header-sidebar ${darkMode ? 'isDark' : ''}`}>
               <Link to='/' className='logo'>
                  <div className='brand'>
                     <img src={Logo} alt='logo' />
                  </div>
                  <div className={`logo ${darkMode ? 'darkmode' : ''}`}>
                     <span>
                        K<span>o</span>ss
                     </span>
                  </div>
               </Link>
               <button
                  className={`close-button ${darkMode ? 'isDark' : ''}`}
                  onClick={toggleBurger}
               >
                  X
               </button>
            </header>
            <Menu>
               <MenuItem title='Home' to='/' icon={<UilEstate />} />
               <MenuItem
                  title='Orders'
                  to='/orders'
                  icon={<UilClipboardAlt />}
               />
               <MenuItem
                  title='Customers'
                  to='/customers'
                  icon={<UilUsersAlt />}
               />
               <MenuItem
                  title='Products'
                  to='/products'
                  icon={<UilPackage />}
               />
               <MenuItem
                  title='Users Detail'
                  to='/usersDetail'
                  icon={<UilUsersAlt />}
               />
               {/* <MenuItem
                  title='Analytics'
                  // dropdownLinks={dropdownLinks}
                  to='/analytics'
                  icon={<UilChart />}
                  className='menuItem'
               />
               <MenuItem
                  title='Videos'
                  to='/video'
                  icon={<UilVideo />}
                  className='menuItem'
               /> */}
            </Menu>
            <div className={`footer-sidebar ${darkMode ? 'isDark' : ''}`}>
               <label className='switch'>
                  <input
                     type='checkbox'
                     className={darkMode ? 'isDark' : ''}
                     onChange={() => {
                        dispatch(toggleDarkMode());
                     }}
                  />
                  <span className='slider'></span>
               </label>
            </div>
         </div>
      </aside>
   );
};

export default Sidebar;
