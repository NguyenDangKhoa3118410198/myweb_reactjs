import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import Menu, { MenuItem, MenuItemDropdown } from './Menu';
import './sidebar.css';
import Logo from '../../imgs/logo.png';
import {
   UilEstate,
   UilClipboardAlt,
   UilUsersAlt,
   UilPackage,
   UilChart,
   UilVideo,
} from '@iconscout/react-unicons';

const Sidebar = ({ isMenuActive, toggleBurger, activeMenu }) => {
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
         <div className='sidebar'>
            <header className='head-sidebar'>
               <Link to='/' className='logo'>
                  <div className='brand'>
                     <img src={Logo} alt='logo' />
                  </div>
                  <div className='logo'>
                     <span>
                        K<span>o</span>ss
                     </span>
                  </div>
               </Link>
               <button className='close-button' onClick={toggleBurger}>
                  X
               </button>
            </header>
            <Menu>
               <MenuItem
                  title='Home'
                  to='/'
                  icon={<UilEstate />}
                  className='menuItem'
               />
               <MenuItem
                  title='Orders'
                  to='/orders'
                  icon={<UilClipboardAlt />}
                  className='menuItem'
               />
               <MenuItem
                  title='Customers'
                  to='/customers'
                  icon={<UilUsersAlt />}
                  className='menuItem'
               />
               <MenuItem
                  title='Products'
                  to='/products'
                  icon={<UilPackage />}
                  className='menuItem'
               />
               <MenuItem
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
               />

               <div style={{ marginBottom: '2rem' }}></div>
            </Menu>
         </div>
      </aside>
   );
};

export default Sidebar;
