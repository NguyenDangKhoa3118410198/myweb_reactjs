import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { UilEllipsisV } from '@iconscout/react-unicons';
import { pageMainDash } from '../../Data/fetchData';

import DashboardBoxChart from '../../components/Statistics/DashboardBoxCharts';
import MyCalendar from '../../components/Calendar';
import ContextualExample from '../../components/ProgressBar';
import Todolist from '../../components/Totolist/Totolist';
import CircularProgressbarChart from '../../components/Statistics/ChartTemplate/CircularProgressbarChart';
import {
   searchBox,
   filterData,
   isFormDataValid,
} from '../../components/Table/TableActions/handleActions';
import { columnsMainDash } from '../../Data/columns';
import './mainDash.css';
import FormPanel from './FormPanel';
import OnTopButton from '../../components/OnTop/OnTop';
import { sendRequest } from '../../ulti/sendHeaderRequest';

const Table = lazy(() => import('../../components/Table/Table'));

const MainDash = () => {
   const [records, setRecords] = useState([]);
   const [currentRecordId, setCurrentRecordId] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');

   const darkMode = useSelector((state) => state.darkMode);
   const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
   const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});

   const [formData, setFormData] = useState({
      name: '',
      username: '',
      email: '',
   });

   useEffect(() => {
      pageMainDash(setRecords);
   }, []);

   const handleClose = (e) => {
      e.preventDefault();
      handleSetFormData();
      setIsAddPanelOpen(false);
      setIsEditPanelOpen(false);
   };

   const handleSetFormData = () => {
      setFormData({
         name: '',
         username: '',
         email: '',
      });
      setCurrentRecordId(null);
   };

   const handleSubmitAndEdit = (e) => {
      e.preventDefault();

      const newFormData = isFormDataValid(formData);

      if (newFormData) {
         if (currentRecordId && isEditPanelOpen) {
            //edit exists record

            const currentRecord = records.find(
               (record) => record.id === currentRecordId
            );

            const invalidEmail = records.some(
               (record) =>
                  record.email === formData.email &&
                  formData.email !== currentRecord.email
            );

            if (invalidEmail) {
               alert(
                  `The email "${formData.email}" already exists.\n Please use a different email address.`
               );
               return;
            }
            handleSave(currentRecordId, newFormData);
         } else if (!currentRecordId && !isEditPanelOpen) {
            //create new record
            const invalidEmail = records.some(
               (record) => record.email === formData.email
            );

            if (invalidEmail) {
               alert(
                  `The email "${formData.email}" already exists.\n Please use a different email address.`
               );
               return;
            }
            handleSave(null, newFormData);
            // console.log(newFormData);
         } else {
            alert('Please select a record to edit.');
         }
         handleSetFormData();
      } else {
         alert(
            'Unable to save data because formData is empty or contains a null value.'
         );
      }
   };

   const handleEditClick = (record) => {
      setIsEditPanelOpen(true);
      setIsAddPanelOpen(false);
      setFormData({
         name: record.name,
         username: record.username,
         email: record.email,
      });
      setCurrentRecordId(record.id);
   };

   const handleView = (record) => {
      setModalView(true);
      setViewCurrent(record);
   };

   const handleSave = async (currentRecordId, record) => {
      if (currentRecordId) {
         const currentRecord = records.find((r) => r.id === currentRecordId);

         if (!currentRecord) {
            alert('Invalid ID');
            return;
         }

         try {
            const response = await sendRequest(
               'POST',
               `api/users/${currentRecordId}/edit`,
               record
            );

            if (response.success) {
               setRecords(
                  records.map((r) =>
                     r.id === currentRecordId ? { ...r, ...record } : r
                  )
               );
               console.log('Updated user successfully');
            } else {
               console.error('Error updating user:', response.message);
            }
         } catch (error) {
            console.error('Error sending request:', error.message);
         }
      } else {
         try {
            const response = await sendRequest('POST', 'api/users/add', record);

            if (response.success) {
               const newRecord = response.newUser;
               setRecords([...records, newRecord]);
               console.log('New user added successfully:', newRecord);
            } else {
               console.error('Error adding new user:', response.message);
            }
         } catch (error) {
            console.error('Error sending request:', error.message);
         }
      }
   };

   const handleDelete = async (record) => {
      try {
         const userId = record.id;

         if (records.length === 0) {
            console.log('No records to delete');
            return;
         }

         const response = await sendRequest('DELETE', `api/users/${userId}`);

         if (response.success) {
            setRecords((prevRecords) =>
               prevRecords.map((r) =>
                  r.id === record.id ? { ...r, isActive: 'false' } : r
               )
            );
            console.log('User deactivated successfully');
         } else {
            console.error('Error deactivated user:', response.message);
         }
      } catch (error) {
         console.error('Failed to deactivated user:', error.message);
      }
   };

   const columns = columnsMainDash({
      handleView,
      handleEditClick,
      handleDelete,
   });
   return (
      <main
         className={`main-dashboard-container  ${darkMode ? 'darkmode' : ''}`}
      >
         <div id='top' style={{ opacity: '0' }}></div>

         <DashboardBoxChart />

         <div className='combined-stats-container'>
            <div className='combined-stats-item'>
               <div className='combined-stats-header'>
                  <h1 className='combined-stats-title'>Top Revenue</h1>
                  <div className='combined-stats-icon'>
                     <UilEllipsisV />
                  </div>
               </div>
               <div className='combined-stats-content'>
                  <CircularProgressbarChart />
               </div>
            </div>

            <div className='combined-stats-item'>
               <div className='combined-stats-header'>
                  <h1 className='combined-stats-title'>Todolist</h1>
                  <div className='combined-stats-icon'>
                     <UilEllipsisV />
                  </div>
               </div>
               <div className='combined-stats-content'>
                  <Todolist />
               </div>
            </div>

            <div className='combined-stats-item'>
               <div className='combined-stats-header'>
                  <h1 className='combined-stats-title'>Progress Chart</h1>
                  <div className='combined-stats-icon'>
                     <UilEllipsisV />
                  </div>
               </div>
               <div className='combined-stats-content'>
                  <ContextualExample />
               </div>
            </div>
         </div>

         <MyCalendar />
         <OnTopButton />

         <div>
            <Suspense fallback={<div>Loading...</div>}>
               <Table
                  title='List of users'
                  columns={columns}
                  data={filterData(searchTerm, records)}
                  searchBox={searchBox(searchTerm, setSearchTerm)}
                  setModalView={setModalView}
                  formData={formData}
                  setFormData={setFormData}
                  FormPanel={FormPanel}
                  tableActions={{
                     setModalView,
                     viewCurrent,
                     isModalView,
                     isAddPanelOpen,
                     isEditPanelOpen,
                     setIsAddPanelOpen,
                     setIsEditPanelOpen,
                     setCurrentRecordId,
                  }}
                  handleActions={{
                     handleSubmitAndEdit,
                     handleClose,
                  }}
               />
            </Suspense>
         </div>
      </main>
   );
};

export default MainDash;
