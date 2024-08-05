import { useEffect, useState, useRef } from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import {
   UserOutlined,
   InfoCircleOutlined,
   MailOutlined,
   SettingOutlined,
   LogoutOutlined,
   SunOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../features/darkmode/darkModeSlice';
import { deleteLocalStorage, getObjectFromLocalStorage } from '../../ulti';
import BurgerIcon from '../../imgs/align-left.svg';
import InputSearch from 'components/common/InputComponent/InputSearch';
import type { MenuProps } from 'antd';
import { RootState } from 'components/features/store';
import './header.css';

const Header = ({ nameContent = '', toggleBurger = () => {} }) => {
   const [avatarUrl, setAvatarUrl] = useState('');
   const username = localStorage.getItem('username');
   const darkMode = useSelector((state: RootState) => state.darkMode);
   const searchInputRef = useRef<HTMLInputElement>(null);
   useEffect(() => {
      const customerObject = getObjectFromLocalStorage('customerInfo');
      setAvatarUrl(customerObject.avatar);
   }, []);

   useEffect(() => {
      const handleKeyDown = (e: any) => {
         if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            searchInputRef.current?.focus();
         }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, []);

   const dispatch = useDispatch();

   const menuItems: MenuProps['items'] = [
      {
         label: <span className='header-username'>Welcome: {username}</span>,
         key: 'welcome',
         disabled: true,
      },
      { type: 'divider' },
      {
         label: (
            <Link to='/info' className='user-menu-item'>
               <InfoCircleOutlined className='icon-sidebar-menu' />
               <span className='name-menu-item'>Info</span>
            </Link>
         ),
         key: 'info',
      },
      {
         label: (
            <Link to='/profile' className='user-menu-item'>
               <UserOutlined className='icon-sidebar-menu' />
               <span className='name-menu-item'>Profile</span>
            </Link>
         ),
         key: 'profile',
      },
      {
         label: (
            <Link to='/contact' className='user-menu-item'>
               <MailOutlined className='icon-sidebar-menu' />
               <span className='name-menu-item'>Contact</span>
            </Link>
         ),
         key: 'contact',
      },
      {
         label: (
            <Link to='/setting' className='user-menu-item'>
               <SettingOutlined className='icon-sidebar-menu' />
               <span className='name-menu-item'>Setting</span>
            </Link>
         ),
         key: 'setting',
      },
      {
         label: (
            <Link
               to='/login'
               className='user-menu-item logout'
               onClick={deleteLocalStorage}
            >
               <LogoutOutlined className='icon-sidebar-menu' />
               <span className='name-menu-item'>Logout</span>
            </Link>
         ),
         key: 'logout',
      },
      { type: 'divider' },
      {
         label: (
            <div
               className='menu-item user-menu-item'
               onClick={() => dispatch(toggleDarkMode())}
            >
               <SunOutlined className='icon-sidebar-menu' />
               <span className='name-menu-item'>Light / Dark</span>
            </div>
         ),
         key: 'dark-mode',
      },
   ];

   return (
      <header
         className={`nav-user-header-container ${darkMode ? 'darkmode' : ''}`}
      >
         <div className='nav-left'>
            <div onClick={toggleBurger} className='burger-icon-wapper'>
               <img
                  className={`burger-icon ${darkMode ? 'white' : ''}`}
                  src={BurgerIcon}
                  alt='Sidebar'
               />
            </div>
            <h1 className='name-tab'>{nameContent}</h1>
         </div>
         <div id='nav-search'>
            <InputSearch size='large' />
         </div>
         <div className='nav-right'>
            <nav>
               <div className='user-utilities'>
                  <div
                     className='icon-menu-item'
                     onClick={() => {
                        dispatch(toggleDarkMode());
                     }}
                  >
                     <SunOutlined />
                  </div>
                  <Dropdown
                     overlay={<Menu items={menuItems} />}
                     trigger={['click']}
                  >
                     <div className='user-profile'>
                        <Avatar
                           src={avatarUrl}
                           icon={!avatarUrl ? <UserOutlined /> : null}
                           className='user-profile-avatar'
                        />
                     </div>
                  </Dropdown>
               </div>
            </nav>
         </div>
      </header>
   );
};

export default Header;
