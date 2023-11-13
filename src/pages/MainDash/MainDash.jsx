import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { UilEllipsisV } from '@iconscout/react-unicons';
import axios from 'axios';

import DashboardBoxChart from '../../components/Statistics/DashboardBoxCharts';
import MyCalendar from '../../components/Calendar';
import ContextualExample from '../../components/ProgressBar';
import Todolist from '../../components/Totolist/Totolist';
import CircularProgressbarChart from '../../components/Statistics/ChartTemplate/CircularProgressbarChart';
import {
   searchBox,
   removeExtraSpaces,
   formDataObjectWithExtraSpacesRemoved,
} from '../../components/Table/TableActions/handleActions';
import { columnsMainDash } from '../../Data/columns';
import { v4 as uuidv4 } from 'uuid';
import './mainDash.css';
import FormPanel from './FormPanel';
const Table = lazy(() => import('../../components/Table/Table'));

const MainDash = () => {
   const [records, setRecords] = useState([]);
   const [currentRecordId, setCurrentRecordId] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [viewCurrent, setViewCurrent] = useState({});

   const darkMode = useSelector((state) => state.darkMode);
   const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
   const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
   const [isModalView, setModalView] = useState(false);

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

      if (Object.values(formData).every((value) => value !== null)) {
         const newFormData = formDataObjectWithExtraSpacesRemoved(formData);
         handleSave(null, newFormData);
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

   const handleView = (record) => {
      setModalView(true);
      setViewCurrent(record);
   };

   const handleEdit = (e) => {
      e.preventDefault();

      if (
         formData &&
         Object.values(formData).every((value) => value !== null)
      ) {
         const newFormData = formDataObjectWithExtraSpacesRemoved(formData);
         handleSave(currentRecordId, newFormData);
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
               value
                  .toLowerCase()
                  .includes(removeExtraSpaces(searchTerm.toLowerCase()))
         )
      );
   }
   const columns = columnsMainDash(handleView, handleEditClick, handleDelete);

   return (
      <main
         className={`main-dashboard-container  ${darkMode ? 'darkmode' : ''}`}
      >
         {/* <Suspense fallback={<div>Loading...</div>}> */}
         <DashboardBoxChart />
         {/* </Suspense> */}

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
                  type='button'
                  className='btn btn-add'
                  onClick={() => {
                     setIsAddPanelOpen(true);
                     setIsEditPanelOpen(false);
                  }}
               >
                  Add
               </button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
               <Table
                  title='List of users'
                  columns={columns}
                  data={filterData(records)}
                  searchBox={searchBox(searchTerm, handleSearch)}
                  isModalView={isModalView}
                  setModalView={setModalView}
                  viewCurrent={viewCurrent}
                  isAddPanelOpen={isAddPanelOpen}
                  isEditPanelOpen={isEditPanelOpen}
                  handleView={handleView}
                  handleSubmit={handleSubmit}
                  handleEdit={handleEdit}
                  handleClose={handleClose}
                  formData={formData}
                  setFormData={setFormData}
                  FormPanel={FormPanel}
               />
            </Suspense>
         </div>
      </main>
   );
};

export default MainDash;
