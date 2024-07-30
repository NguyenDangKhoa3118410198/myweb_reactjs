import { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import Menu, { MenuItem, MenuItemDropdown } from './Menu';
import './sidebar.css';
import {
   UilEstate,
   UilClipboardAlt,
   UilUsersAlt,
   UilPackage,
} from '@iconscout/react-unicons';
import { useSelector } from 'react-redux';
import HeaderSidebar from './HeaderSidebar';
import FooterSidebar from './FooterSidebar';

const Sidebar = ({ isMenuActive, activeMenu }) => {
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
            <HeaderSidebar darkMode={darkMode} />
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
            <FooterSidebar darkMode={darkMode} />
         </div>
      </aside>
   );
};

export default Sidebar;
