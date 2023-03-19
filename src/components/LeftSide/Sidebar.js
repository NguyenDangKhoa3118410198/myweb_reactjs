import React from "react";
import { Link } from "react-router-dom";
import { UilSignOutAlt } from "@iconscout/react-unicons";

import Menu, { MenuItem } from "./Menu";
import "./Sidebar.css";
import Logo from "../../imgs/logo.png";
import {
   UilEstate,
   UilClipboardAlt,
   UilUsersAlt,
   UilPackage,
   UilChart,
} from "@iconscout/react-unicons";

const Sidebar = () => {
   return (
      <>
         <div className="sidebar">
            {/* logo */}
            <Link to="/" className="logo">
               <img src={Logo} alt="logo" />
               <span>
                  Sh<span>o</span>ps
               </span>
            </Link>

            <Menu>
               <MenuItem
                  title="Home"
                  to="/"
                  icon={<UilEstate />}
                  className="menuItem"
               />
               <MenuItem
                  title="Orders"
                  to="/orders"
                  icon={<UilClipboardAlt />}
                  className="menuItem"
               />
               <MenuItem
                  title="Customers"
                  to="/customers"
                  icon={<UilUsersAlt />}
                  className="menuItem"
               />
               <MenuItem
                  title="Products"
                  to="/products"
                  icon={<UilPackage />}
                  className="menuItem"
               />
               <MenuItem
                  title="Analytics"
                  to="/analytics"
                  icon={<UilChart />}
                  className="menuItem"
               />

               {/* {SidebarData.map((item) => {
                  return (
                     <Link
                        to={item.to}
                        className={
                           selected === item.id ? "menuItem active" : "menuItem"
                        }
                        key={item.id}
                        onClick={() => {
                           setSelected(item.id);
                        }}
                     >
                        <item.icon />
                        <span className="item">{item.heading}</span>
                     </Link>
                  );
               })} */}

               {/* signoutIcon */}
               <div className="iconSignOut">
                  <UilSignOutAlt />
               </div>
            </Menu>
         </div>
      </>
   );
};

export default Sidebar;
