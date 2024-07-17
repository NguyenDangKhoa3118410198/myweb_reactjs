import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSettingCalendar } from 'components/features/setting/settingSlice';
import './setting.css';
import { Button } from 'antd';
import { useState } from 'react';
import GeneralSetting from './General';
import { ArrowLeftOutlined } from '@ant-design/icons';

function Setting() {
   const dispatch = useDispatch();
   const calendar = useSelector((state) => state.setting.calendar);
   const [activeTab, setActiveTab] = useState('general');
   const handleCheckboxChange = () => {
      dispatch(setSettingCalendar(!calendar));
   };

   const renderContent = () => {
      switch (activeTab) {
         case 'general':
            return (
               <GeneralSetting
                  handleCheckboxChange={handleCheckboxChange}
                  calendar={calendar}
               />
            );
         case 'tab2':
            return <div>Nội dung Tab 2</div>;
         case 'tab3':
            return <div>Nội dung Tab 3</div>;
         default:
            return <div>Nội dung mặc định</div>;
      }
   };

   return (
      <>
         <div className='setting-header'>
            <div className='back-btn-container'>
               <Link to='/home' className='back'>
                  <ArrowLeftOutlined /> Back
               </Link>
            </div>
         </div>
         <div className='setting-bottom'>
            <div className='setting-sidebar'>
               <Button
                  className={`setting-sidebar-btn ${
                     activeTab === 'general' ? 'active' : ''
                  }`}
                  onClick={() => setActiveTab('general')}
               >
                  Tab1
               </Button>
               <Button
                  className={`setting-sidebar-btn ${
                     activeTab === 'tab2' ? 'active' : ''
                  }`}
                  onClick={() => setActiveTab('tab2')}
               >
                  Tab 2
               </Button>
               <Button
                  className={`setting-sidebar-btn ${
                     activeTab === 'tab3' ? 'active' : ''
                  }`}
                  onClick={() => setActiveTab('tab3')}
               >
                  Tab 3
               </Button>
            </div>
            <div className='setting-content'>{renderContent()}</div>
         </div>
      </>
   );
}

export default Setting;
