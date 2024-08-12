import { Button } from 'antd';
import { useState } from 'react';
import GeneralSetting from './General';
import Profile from 'pages/Profile';
import './setting.css';

const Setting = () => {
   const [activeTab, setActiveTab] = useState('profile');

   const renderContent = () => {
      switch (activeTab) {
         case 'profile':
            return <Profile />;
         case 'general':
            return <GeneralSetting />;
         case 'security':
            return <div>Updating</div>;
         default:
            return <div>Nội dung mặc định</div>;
      }
   };

   return (
      <div className='setting-layout'>
         <div className='setting-wrapper'>
            <div className='setting-content'>
               <div className='setting-sidebar'>
                  <Button
                     className={`setting-sidebar-btn ${
                        activeTab === 'profile' ? 'active' : ''
                     }`}
                     onClick={() => setActiveTab('profile')}
                  >
                     Profile
                  </Button>
                  <Button
                     className={`setting-sidebar-btn ${
                        activeTab === 'general' ? 'active' : ''
                     }`}
                     onClick={() => setActiveTab('general')}
                  >
                     General
                  </Button>
                  <Button
                     className={`setting-sidebar-btn ${
                        activeTab === 'security' ? 'active' : ''
                     }`}
                     onClick={() => setActiveTab('security')}
                  >
                     Security
                  </Button>
               </div>
               <div className='setting-main-content'>{renderContent()}</div>
            </div>
         </div>
      </div>
   );
};

export default Setting;
