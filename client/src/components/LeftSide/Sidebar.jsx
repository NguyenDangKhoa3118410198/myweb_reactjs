import { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import Menu, { MenuItem, MenuItemDropdown } from './Menu';
import './sidebar.css';
import {
   HomeOutlined,
   FileTextOutlined,
   UserOutlined,
   BoxPlotOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import HeaderSidebar from './HeaderSidebar';
import FooterSidebar from './FooterSidebar';

const Sidebar = ({ isMenuActive, activeMenu }) => {
   const darkMode = useSelector((state) => state.darkMode);
   // eslint-disable-next-line no-unused-vars
   const dropdownLinks = [
      { title: 'All Customers', to: '/' },
      { title: 'Add Customer', to: '/customers' },
   ];

   const listMenuItem = [
      {
         title: 'Home',
         to: '/',
         icon: <HomeOutlined />,
      },
      {
         title: 'Orders',
         to: '/orders',
         icon: <FileTextOutlined />,
      },
      {
         title: 'Customers',
         to: '/customers',
         icon: <UserOutlined />,
      },
      {
         title: 'Products',
         to: '/products',
         icon: <BoxPlotOutlined />,
      },
      {
         title: 'Users Detail',
         to: '/usersDetail',
         icon: <UserOutlined />,
      },
   ];

   const componentRef = useRef(null);

   useEffect(() => {
      function handleClickOutside(event) {
         if (
            componentRef.current &&
            !componentRef.current.contains(event.target)
         ) {
            activeMenu(false);
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [activeMenu]);

   return (
      <aside
         ref={componentRef}
         className={`side-menu ${isMenuActive ? 'open' : ''}`}
      >
         <div className={`sidebar ${darkMode ? 'isDark' : ''}`}>
            <HeaderSidebar darkMode={darkMode} />
            <Menu>
               {listMenuItem.map((menuItem) => (
                  <MenuItem
                     key={menuItem.title}
                     title={menuItem.title}
                     to={menuItem.to}
                     icon={menuItem.icon}
                  />
               ))}

               {/* <MenuItem
                  title='Analytics'
                  // dropdownLinks={dropdownLinks}
                  to='/analytics'
                  icon={<UilChart />}
                  className='menuItem'
               />
               <MenuItem
                  title='Videos'
                  to='/video'
                  icon={<UilVideo />}
                  className='menuItem'
               /> */}
            </Menu>
            <FooterSidebar darkMode={darkMode} />
         </div>
      </aside>
   );
};

export default Sidebar;
