import React from 'react';
import { EllipsisOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';

interface StatsCardProps {
   title: string;
   onHide: () => void;
   content: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, onHide, content }) => {
   const handleMenuClick = (e: any) => {
      if (e.key === 'hide') {
         onHide();
      }
   };

   const menuItems = [
      {
         key: 'hide',
         label: 'Hide',
         icon: <EyeInvisibleOutlined />,
      },
   ];

   const menu = <Menu items={menuItems} onClick={handleMenuClick} />;

   return (
      <div className='combined-stats-item'>
         <div className='combined-stats-header'>
            <h1 className='combined-stats-title'>{title}</h1>
            <Dropdown overlay={menu} trigger={['click']}>
               <div className='combined-stats-icon'>
                  <EllipsisOutlined />
               </div>
            </Dropdown>
         </div>
         <div className='combined-stats-content'>{content}</div>
      </div>
   );
};

export default StatsCard;
