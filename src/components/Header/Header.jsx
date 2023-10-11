import React, { useState, useRef, useEffect } from 'react';

import './Header.css';
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

const Header = ({ nameContent, toggleBurger, darkMode, setDarkMode }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const menuRef = useRef(null);
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
      <header className={`nav-user-header ${darkMode ? 'darkmode' : ''}`}>
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
                     setDarkMode(!darkMode);
                  }}
               />
               <span className='slider round'></span>
            </label>
            <span className='theme-title'>Darkmode Header</span>
         </div>

         <div ref={menuRef}>
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
                        <span> Xin chao : Admin</span>
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
