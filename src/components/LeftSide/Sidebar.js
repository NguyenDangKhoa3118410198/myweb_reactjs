import React, { useState } from "react";
import { Link } from "react-router-dom";

import Menu, { MenuItem, MenuItemDropdown } from "./Menu";
import "./Sidebar.css";
import Logo from "../../imgs/logo.png";
import {
   UilEstate,
   UilClipboardAlt,
   UilUsersAlt,
   UilPackage,
   UilChart,
   UilVideo,
   UilBars,
} from "@iconscout/react-unicons";

const Sidebar = () => {
   const [showSidebar, setShowSidebar] = useState(false);
   const dropdownLinks = [
      { title: "All Customers", to: "/" },
      { title: "Add Customer", to: "/customers" },
   ];

   function toggleSidebar() {
      setShowSidebar(!showSidebar);
   }
   return (
      <>
         {showSidebar ? (
            <div className="sidebar">
               <Link to="/" className="logo">
                  <img src={Logo} alt="logo" />
                  <span>
                     K<span>o</span>ss
                  </span>
                  <Link className="btn-toggle" onClick={toggleSidebar}>
                     <UilBars />
                  </Link>
               </Link>

               <Menu showSidebar={showSidebar}>
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
                  {/* <MenuItemDropdown
                     title="Analytics"
                     // to="/analytics"
                     dropdownLinks={dropdownLinks}
                     icon={<UilChart />}
                     className="menuItem"
                  /> */}
                  <MenuItem
                     title="Videos"
                     to="/video"
                     icon={<UilVideo />}
                     className="menuItem"
                  />
                  {/* <MenuItemDropdown
                     title="Test"
                     dropdownLinks={dropdownLinks}
                     icon={<UilUsersAlt />}
                     className="menuItem"
                  /> */}

                  <div style={{ marginBottom: "2rem" }}></div>
               </Menu>
            </div>
         ) : (
            <div className="menu-toggle">
               <Link className="btn-toggle" onClick={toggleSidebar}>
                  <UilBars />
               </Link>

               <Menu>
                  <MenuItem to="/" icon={<UilEstate />} className="menuItem" />
                  <MenuItem
                     to="/orders"
                     icon={<UilClipboardAlt />}
                     className="menuItem"
                  />
                  <MenuItem
                     to="/customers"
                     icon={<UilUsersAlt />}
                     className="menuItem"
                  />
                  <MenuItem
                     to="/products"
                     icon={<UilPackage />}
                     className="menuItem"
                  />
                  <MenuItem
                     to="/video"
                     icon={<UilVideo />}
                     className="menuItem"
                  />

                  <div style={{ marginBottom: "2rem" }}></div>
               </Menu>
            </div>
         )}
      </>
   );
};

export default Sidebar;
