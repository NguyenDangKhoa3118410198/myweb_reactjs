import React, { useEffect, useState } from 'react';
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
import './header.css';

const Header = ({ nameContent, toggleBurger }) => {
   const [avatarUrl, setAvatarUrl] = useState('');
   const darkMode = useSelector((state) => state.darkMode);
   const username = localStorage.getItem('username');

   useEffect(() => {
      const customerObject = getObjectFromLocalStorage('customerInfo');
      setAvatarUrl(customerObject.avatar);
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
                  <span className='header-username'> {username}</span>

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

                     <Dropdown.Menu>
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
                     </Dropdown.Menu>
                  </Dropdown>
               </div>
            </nav>
         </div>
      </header>
   );
};

export default Header;
