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

const Header = ({ nameContent, toggleBurger }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const menuRef = useRef(null);

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
      <header className='nav-user-header'>
         <div className='nav-left'>
            <div onClick={toggleBurger} className='burger-icon'>
               <UilBars />
            </div>

            <h1>{nameContent}</h1>
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

                  <span>Xin chao : Admin </span>

                  <div className='user-header' onClick={toggleMenu}>
                     <UilUser className='user-header__icon' />
                  </div>
               </div>
               <ul className='menu-user'>
                  {isMenuOpen && (
                     <ul className='dropdown-menu'>
                        <li>
                           <Link to='/'>
                              <div className='menu-item'>
                                 <UilInfoCircle className='icon-menu-item-dropdown' />
                                 <span className='menu-item-content'>Info</span>
                              </div>
                           </Link>
                        </li>
                        <li>
                           <Link to='/orders'>
                              <div className='menu-item'>
                                 <UilQuestionCircle className='icon-menu-item-dropdown' />
                                 <span className='menu-item-content'>
                                    Feedback
                                 </span>
                              </div>
                           </Link>
                        </li>
                        <li>
                           <Link to='/login'>
                              <div className='menu-item'>
                                 <UilSignout className='icon-menu-item-dropdown' />
                                 <span className='menu-item-content'>
                                    Logout
                                 </span>
                              </div>
                           </Link>
                        </li>
                     </ul>
                  )}
               </ul>
            </nav>
         </div>
      </header>
   );
};

export default Header;
