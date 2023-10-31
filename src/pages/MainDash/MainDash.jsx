import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UilEllipsisV } from '@iconscout/react-unicons';
import axios from 'axios';

import Table from '../../components/Table/Table';
import DashboardBoxChart from '../../components/Charts/DashboardBoxCharts';
import MyCalendar from '../../components/Calendar';
import ContextualExample from '../../components/ProgressBar';
import Todolist from '../../components/Totolist/Totolist';
import CircularProgressbarChart from '../../components/Charts/ChartTemplate/CircularProgressbarChart';
import { searchBox } from '../../components/Table/TableActions/handleActions';
import { columnsMainDash } from '../../Data/columns';
import { v4 as uuidv4 } from 'uuid';
import './mainDash.css';

const MainDash = () => {
   const [records, setRecords] = useState([]);
   const [currentRecordId, setCurrentRecordId] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');

   const darkMode = useSelector((state) => state.darkMode);
   const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
   const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

   const [formData, setFormData] = useState({
      name: '',
      username: '',
      email: '',
   });

   useEffect(() => {
      axios
         .get('https://jsonplaceholder.typicode.com/users')
         .then((response) => {
            const updatedData = response.data.map((user) => {
               return {
                  id: uuidv4(),
                  name: user.name,
                  username: user.username,
                  email: user.email,
               };
            });
            setRecords(updatedData);
         })
         .catch((error) => {
            console.log(error);
         });
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
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const invalidEmail = records.some(
         (record) => record.email === formData.email
      );

      if (invalidEmail) {
         alert(
            `The email "${formData.email}" already exists.\n Please use a different email address.`
         );
         return;
      }

      if (Object.values(formData).some((value) => value !== null)) {
         handleSave(null, formData);
         handleSetFormData();
      } else {
         console.log(
            'Không thể lưu dữ liệu vì formData rỗng hoặc chứa giá trị null.'
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

   const handleEdit = (e) => {
      e.preventDefault();
      if (formData && Object.values(formData).some((value) => value !== null)) {
         handleSave(currentRecordId, formData);
         handleSetFormData();
      } else {
         console.log(
            'Không thể lưu dữ liệu vì formData rỗng hoặc chứa giá trị null.'
         );
      }
   };

   const handleSave = (currentRecordId, record) => {
      if (currentRecordId) {
         const currentRecord = records.find((r) => r.id === currentRecordId);
         if (!currentRecord) {
            alert('ID không tồn tại');
            return;
         }

         setRecords(
            records.map((r) =>
               r.id === currentRecordId ? { ...r, ...record } : r
            )
         );
      } else {
         const newRecord = { ...record, id: uuidv4() };
         setRecords([...records, newRecord]);
      }
   };

   const handleDelete = (record) => {
      if (records.length === 0) {
         console.log('No records to delete');
         return;
      }
      setRecords(records.filter((r) => r.id !== record.id));
   };

   function handleSearch(event) {
      setSearchTerm(event.target.value);
   }

   function filterData(records) {
      return records.filter((row) =>
         Object.values(row).some(
            (value) =>
               typeof value === 'string' &&
               value.toLowerCase().includes(searchTerm.toLowerCase().trim())
         )
      );
   }
   const columns = columnsMainDash(handleEditClick, handleDelete);

   return (
      <main
         className={`main-dashboard-container  ${darkMode ? 'darkmode' : ''}`}
      >
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

         <div
            style={{
               padding: '1rem',
            }}
         >
            <div className='add-filter-wrapper'>
               <button
                  className='btn btn-success btn-add'
                  onClick={() => {
                     setIsAddPanelOpen(true);
                     setIsEditPanelOpen(false);
                  }}
               >
                  Add
               </button>
            </div>

            <Table
               title='List of users'
               columns={columns}
               data={filterData(records)}
               searchBox={searchBox(searchTerm, handleSearch)}
               isAddPanelOpen={isAddPanelOpen}
               isEditPanelOpen={isEditPanelOpen}
               handleSubmit={handleSubmit}
               handleEdit={handleEdit}
               handleClose={handleClose}
               formData={formData}
               setFormData={setFormData}
            />
         </div>
      </main>
   );
};

export default MainDash;
