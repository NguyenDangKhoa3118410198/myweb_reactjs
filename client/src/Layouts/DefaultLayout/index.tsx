import React, { useState } from 'react';
import Sidebar from '../../components/LeftSide/Sidebar';
import Header from '../../components/Header/Header';
import './AdminDefaultLayout.css';
import { useSelector } from 'react-redux';

interface IAdminDefaultLayout {
   name: string;
   children: React.ReactNode;
}

const AdminDefaultLayout: React.FC<IAdminDefaultLayout> = ({
   name,
   children,
}) => {
   const [isMenuActive, activeMenu] = useState(false);
   const darkMode = useSelector((state: any) => state.darkMode);

   const toggleBurger = () => {
      activeMenu(!isMenuActive);
   };

   return (
      <div className='admin-layout'>
         <Sidebar isMenuActive={isMenuActive} activeMenu={activeMenu} />

         <div
            className={`admin-layout-container ${darkMode ? 'darkmode' : ''}`}
         >
            <Header nameContent={name} toggleBurger={toggleBurger} />
            {children}
         </div>
      </div>
   );
};

export default AdminDefaultLayout;
