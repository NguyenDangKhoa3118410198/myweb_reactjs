import React from "react";
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
} from "@iconscout/react-unicons";

const Sidebar = () => {
   const dropdownLinks = [
      { title: "All Customers", to: "/customers/all" },
      { title: "Add Customer", to: "/customers/new" },
   ];
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
               <MenuItemDropdown
                  title="Test"
                  dropdownLinks={dropdownLinks}
                  icon={<UilUsersAlt />}
                  className="menuItem"
               />
               <MenuItem
                  title="Analytics"
                  to="/analytics"
                  icon={<UilChart />}
                  className="menuItem"
               />
               <div style={{ marginBottom: "2rem" }}></div>
            </Menu>
         </div>
      </>
   );
};

export default Sidebar;
