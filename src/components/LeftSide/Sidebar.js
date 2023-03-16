import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UilSignOutAlt } from "@iconscout/react-unicons";

import "./Sidebar.css";
import Logo from "../../imgs/logo.png";
import { SidebarData } from "../../Data/Data";

const Sidebar = () => {
   const [selected, setSelected] = useState(0);

   return (
      <>
         <div className="sidebar">
            {/* logo */}
            <div className="logo">
               <img src={Logo} alt="logo" />
               <span>
                  Sh<span>o</span>ps
               </span>
            </div>

            <div className="menu">
               {SidebarData.map((item, index) => {
                  return (
                     <Link
                        to={item.to}
                        className={
                           selected === index ? "menuItem active" : "menuItem"
                        }
                        key={index}
                        onClick={() => setSelected(index)}
                     >
                        <item.icon />
                        <span className="item">{item.heading}</span>
                     </Link>
                  );
               })}
               {/* signoutIcon */}
               <div className="menuItem">
                  <UilSignOutAlt />
               </div>
            </div>
         </div>
      </>
   );
};

export default Sidebar;
