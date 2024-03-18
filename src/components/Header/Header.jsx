import React, { useEffect, useState } from 'react';
import {
   UilUser,
   UilInfoCircle,
   UilSignout,
   UilBars,
   UilCalendarAlt,
   UilSun,
} from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../features/darkmode/darkModeSlice';
import { deleteLocalStorage } from '../../ulti';
import './header.css';

const Header = ({ nameContent, toggleBurger }) => {
   const [avatarUrl, setAvatarUrl] = useState('');
   const darkMode = useSelector((state) => state.darkMode);
   const username = localStorage.getItem('username');

   useEffect(() => {
      if (!localStorage.getItem('avatarUrl')) {
         localStorage.setItem(
            'avatarUrl',
            'https://cdn.tuoitre.vn/471584752817336320/2023/1/6/screenshot-2023-01-06-152423-16729934769782082638601.png'
         );
         setAvatarUrl(
            'https://cdn.tuoitre.vn/471584752817336320/2023/1/6/screenshot-2023-01-06-152423-16729934769782082638601.png'
         );
      } else setAvatarUrl(localStorage.getItem('avatarUrl'));
   }, []);

   const dispatch = useDispatch();

   return (
      <header
         className={`nav-user-header-container ${darkMode ? 'darkmode' : ''}`}
      >
         <div className='nav-left'>
            <div onClick={toggleBurger} className='burger-icon'>
               <UilBars />
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
                                 width: '40px',
                                 height: '40px',
                                 objectFit: 'cover',
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
                              <UilInfoCircle />
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
