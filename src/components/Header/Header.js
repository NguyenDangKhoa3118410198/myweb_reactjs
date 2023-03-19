import React from "react";

import "./Header.css";
import { UilUser } from "@iconscout/react-unicons";

const Header = ({ nameContent }) => {
   let currentUser = true;

   return currentUser ? (
      <div className="Header">
         <div>
            <h1>{nameContent}</h1>
         </div>
         <div className="toolbars">
            <span className="title-username">Xin chao</span>
            <button className="user">
               <UilUser />
            </button>
         </div>
      </div>
   ) : (
      navigator("/login")
   );
};

export default Header;
