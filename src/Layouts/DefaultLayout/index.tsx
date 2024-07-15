import React, { useState } from 'react';
import Sidebar from '../../components/LeftSide/Sidebar';
import Header from '../../components/Header/Header';
import './AdminDefaultLayout.css';

interface IAdminDefaultLayout {
   name: string;
   children: React.ReactNode;
}

const AdminDefaultLayout: React.FC<IAdminDefaultLayout> = ({
   name,
   children,
}) => {
   const [isMenuActive, activeMenu] = useState(false);

   const toggleBurger = () => {
      activeMenu(!isMenuActive);
   };

   return (
      <div className='admin-layout'>
         <Sidebar
            isMenuActive={isMenuActive}
            toggleBurger={toggleBurger}
            activeMenu={activeMenu}
         />

         <div className='admin-layout-container'>
            <Header nameContent={name} toggleBurger={toggleBurger} />
            {children}
         </div>
      </div>
   );
};

export default AdminDefaultLayout;
