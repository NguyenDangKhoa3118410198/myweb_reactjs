import React, { useState, useRef, useEffect } from 'react';

import './header.css';
import {
   UilUser,
   UilInfoCircle,
   UilQuestionCircle,
   UilSignout,
   UilBars,
} from '@iconscout/react-unicons';
import { FaBell, FaCalendarCheck, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../features/darkmode/darkModeSlice';

const Header = ({ nameContent, toggleBurger }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const menuRef = useRef(null);
   const darkMode = useSelector((state) => state.darkMode);
   const dispatch = useDispatch();
   // eslint-disable-next-line
   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const handleOutsideClick = (event) => {
      if (!menuRef.current.contains(event.target)) {
         setIsMenuOpen(false);
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
         document.removeEventListener('mousedown', handleOutsideClick);
      };
   }, [menuRef]);

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
         <div className='header-theme-toggle'>
            <label className='switch'>
               <input
                  type='checkbox'
                  onClick={() => {
                     dispatch(toggleDarkMode());
                  }}
               />
               <span className='slider round'></span>
            </label>
            <span className='theme-title'>Darkmode Header</span>
         </div>

         <div ref={menuRef} className='nav-right'>
            <nav>
               <div className='user-utilities'>
                  <div className='icon-menu-item'>
                     <FaBell />
                  </div>
                  <div className='icon-menu-item'>
                     <FaCalendarCheck />
                  </div>
                  <div className='icon-menu-item'>
                     <FaQuestionCircle />
                  </div>

                  <Dropdown>
                     <Dropdown.Toggle
                        className='user-profile'
                        id='dropdown-basic'
                     >
                        <UilUser />
                        <span className='user-name'></span>
                     </Dropdown.Toggle>

                     <Dropdown.Menu>
                        <Dropdown.Item as={Link} to='/'>
                           <div className='menu-item'>
                              <UilInfoCircle className='icon-menu-item-dropdown' />
                              <span className='name-menu-item'>Info</span>
                           </div>
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to='/orders'>
                           <div className='menu-item'>
                              <UilQuestionCircle className='icon-menu-item-dropdown' />
                              <span className='name-menu-item'>Feedback</span>
                           </div>
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to='/login'>
                           <div className='menu-item'>
                              <UilSignout className='icon-menu-item-dropdown' />
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
