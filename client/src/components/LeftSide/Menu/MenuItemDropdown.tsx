import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import './menu.css';

interface IMenuItemDropDown {
   title: string;
   dropdownLinks: any;
   icon: any;
}

const MenuItemDropdown: React.FC<IMenuItemDropDown> = ({
   title,
   dropdownLinks,
   icon,
}) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };

   return (
      <div className='wrapperMenu'>
         <div className='menuItemDropdown' onClick={toggleDropdown}>
            <span className='icon'>{icon}</span>
            <span className='item'>{title}</span>
            <span className={`iconDropdown ${isDropdownOpen ? 'rotate' : ''} `}>
               <DownOutlined />
            </span>
         </div>

         {isDropdownOpen && (
            <div className='dropdownContent'>
               {dropdownLinks.map((subLink: any) => (
                  <NavLink to={subLink.to} key={subLink.to}>
                     {subLink.title}
                  </NavLink>
               ))}
            </div>
         )}
      </div>
   );
};

export default MenuItemDropdown;
