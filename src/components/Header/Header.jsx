import React, { useEffect, useState, useRef } from 'react';
import {
   UilUser,
   UilInfoCircle,
   UilSignout,
   UilCalendarAlt,
   UilSun,
} from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../features/darkmode/darkModeSlice';
import { deleteLocalStorage, getObjectFromLocalStorage } from '../../ulti';
import BurgerIcon from '../../imgs/align-left.svg';
import IconSearch from '../../imgs/IconSearch';

import './header.css';

const Header = ({ nameContent, toggleBurger }) => {
   const [avatarUrl, setAvatarUrl] = useState('');
   const darkMode = useSelector((state) => state.darkMode);
   const username = localStorage.getItem('username');
   const searchInputRef = useRef(null);

   useEffect(() => {
      const customerObject = getObjectFromLocalStorage('customerInfo');
      setAvatarUrl(customerObject.avatar);
   }, []);

   useEffect(() => {
      const handleKeyDown = (event) => {
         if (event.ctrlKey && event.key === '/') {
            event.preventDefault();
            searchInputRef.current.focus();
         }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, []);

   const dispatch = useDispatch();

   return (
      <header
         className={`nav-user-header-container ${darkMode ? 'darkmode' : ''}`}
      >
         <div className='nav-left'>
            <div onClick={toggleBurger} className='burger-icon-wapper'>
               <img
                  className={`burger-icon ${darkMode ? 'white' : ''}`}
                  src={BurgerIcon}
                  alt='Sidebar'
               />
            </div>

            <h1 className='name-tab'>{nameContent}</h1>
         </div>
         <div id='nav-search'>
            <input
               ref={searchInputRef}
               id='nav-input-search'
               type='search'
               placeholder='Enter something to search'
            />
            <IconSearch className='nav-search-icon' />
         </div>

         <div className='nav-right'>
            <nav>
               <div className='user-utilities'>
                  <div
                     className='icon-menu-item'
                     onClick={() => {
                        dispatch(toggleDarkMode());
                     }}
                  >
                     <UilSun />
                  </div>

                  <Dropdown>
                     <Dropdown.Toggle className='user-profile'>
                        {avatarUrl ? (
                           <img
                              style={{
                                 width: '45px',
                                 height: '45px',
                                 objectFit: 'cover',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 borderRadius: '50%',
                              }}
                              src={avatarUrl}
                              alt='error'
                           />
                        ) : (
                           <UilUser />
                        )}
                     </Dropdown.Toggle>

                     <Dropdown.Menu className='custom-dropdown-menu'>
                        <Dropdown.Header>
                           <span className='header-username'>
                              Welcome: {username}
                           </span>
                        </Dropdown.Header>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to='/info'>
                           <div className='menu-item'>
                              <UilInfoCircle />
                              <span className='name-menu-item'>Info</span>
                           </div>
                        </Dropdown.Item>

                        <Dropdown.Item as={Link} to='/profile'>
                           <div className='menu-item'>
                              <UilUser />
                              <span className='name-menu-item'>Profile</span>
                           </div>
                        </Dropdown.Item>

                        <Dropdown.Item as={Link} to='/contact'>
                           <div className='menu-item'>
                              <UilCalendarAlt />
                              <span className='name-menu-item'>Contact</span>
                           </div>
                        </Dropdown.Item>

                        <Dropdown.Item
                           as={Link}
                           to='/login'
                           onClick={deleteLocalStorage}
                        >
                           <div className='menu-item'>
                              <UilSignout />
                              <span className='name-menu-item'>Logout</span>
                           </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                           <div
                              // className='icon-menu-item'
                              className='menu-item'
                              onClick={() => {
                                 dispatch(toggleDarkMode());
                              }}
                           >
                              <UilSun />
                              <span className='name-menu-item'>
                                 Light / Dark
                              </span>
                           </div>
                        </Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
               </div>
            </nav>
         </div>
      </header>
   );
};

export default Header;
