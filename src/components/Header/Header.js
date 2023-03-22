import React, { useState, useRef, useEffect } from "react";

import "./Header.css";
import { UilUser, UilInfoCircle } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const Header = ({ nameContent }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   let currentUser = true;
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
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
         document.removeEventListener("mousedown", handleOutsideClick);
      };
   }, [menuRef]);

   return currentUser ? (
      <header className="Header">
         <div>
            <h1>{nameContent}</h1>
         </div>

         <div ref={menuRef}>
            <nav>
               <div className="user-header" onClick={toggleMenu}>
                  <span>Xin chao : Admin </span>
                  <UilUser className="user-header__icon" />
               </div>
               <ul className="menu-user">
                  {isMenuOpen && (
                     <ul className="dropdown-menu">
                        <li className="menu-item">
                           <Link to="/">
                              <span className="menu-item-content">Info</span>
                           </Link>
                        </li>
                        <li className="menu-item">
                           <Link to="/orders">
                              <span className="menu-item-content">
                                 Feedback
                              </span>
                           </Link>
                        </li>
                        <li className="menu-item">
                           <Link to="/products">
                              <span className="menu-item-content">Logout</span>
                           </Link>
                        </li>
                     </ul>
                  )}
               </ul>
            </nav>
         </div>
      </header>
   ) : (
      navigator("/login")
   );
};

export default Header;
