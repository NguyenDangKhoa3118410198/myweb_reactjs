import React, {
   useState,
   useEffect,
   lazy,
   Suspense,
   startTransition,
} from 'react';
import { useSelector } from 'react-redux';
import {
   searchBox,
   filterData,
   isFormDataValid,
} from '../../components/Table/TableActions/handleActions';
import { columnsMainDash } from '../../Data/columns';
import FormPanel from './FormPanel';
import { sendRequest } from '../../ulti/sendHeaderRequest';
import {
   alertMessage,
   alertMessageError,
   alertSuccess,
} from '../../ulti/modals';
import { updateCountingUsers } from '../../components/features/appInformation/appInformationSlice';
import { Spin } from 'antd';
import { RootState } from 'components/features/store';
import {
   ProgressChartStats,
   TodolistStats,
   TopRevenueStats,
} from './ListStats';
import { fetchUsers } from 'components/features/thunk/thunk';
import { useAppDispatch } from 'hooks/useAppDispatch';
import './mainDash.css';

const MyCalendar = lazy(() => import('../../components/Calendar'));
const Table = lazy(() => import('../../components/Table/Table'));
const DashboardBoxChart = lazy(
   () => import('../../components/Statistics/DashboardBoxCharts')
);

const MainDash = () => {
   const [records, setRecords] = useState<any>([]);
   const [currentRecordId, setCurrentRecordId] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');

   const darkMode = useSelector((state: RootState) => state.darkMode);
   const calendar = useSelector((state: RootState) => state.setting.calendar);

   const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
   const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});
   const [currentPage, setCurrentPage] = useState(1);
   const [limitPage, setLimitPage] = useState(5);
   const dispatch = useAppDispatch();

   const { users, status, totalPages } = useSelector(
      (state: RootState) => state.root.user
   );

   const [formData, setFormData] = useState({
      name: '',
      username: '',
      email: '',
   });

   useEffect(() => {
      dispatch(fetchUsers({ page: currentPage, limit: limitPage }));
   }, [dispatch, currentPage, limitPage]);

   useEffect(() => {
      setRecords(users);
   }, [users]);

   const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
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

   const handleSubmitAndEdit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      startTransition(() => {
         const newFormData = isFormDataValid(formData);

         if (newFormData) {
            if (currentRecordId && isEditPanelOpen) {
               //edit exists record
               const currentRecord = records.find(
                  (record: any) => record.id === currentRecordId
               );

               const invalidEmail = records.some(
                  (record: any) =>
                     record.email === formData.email &&
                     formData.email !== currentRecord.email
               );

               if (invalidEmail) {
                  alertMessageError(
                     `The email "${formData.email}" already exists.\n Please use a different email address.`
                  );
                  return;
               }
               handleSave(currentRecordId, newFormData);
            } else if (!currentRecordId && !isEditPanelOpen) {
               //create new record
               const invalidEmail = records.some(
                  (record: any) => record.email === formData.email
               );

               if (invalidEmail) {
                  alertMessageError(
                     `The email "${formData.email}" already exists.\n Please use a different email address.`
                  );
                  return;
               }
               handleSave('', newFormData);
            } else {
               alertMessage('Please select a record to edit.');
            }
            handleSetFormData();
         } else {
            alertMessageError(
               'Unable to save data because formData is empty or contains a null value.'
            );
         }
      });
   };

   const handleEditClick = (record: any) => {
      setIsEditPanelOpen(true);
      setIsAddPanelOpen(false);
      setFormData({
         name: record.name,
         username: record.username,
         email: record.email,
      });
      setCurrentRecordId(record.id);
   };

   const handleView = (record: any) => {
      setModalView(true);
      setViewCurrent(record);
   };

   const handleSave = async (currentRecordId: string, record: any) => {
      if (currentRecordId) {
         const currentRecord = records.find(
            (r: any) => r.id === currentRecordId
         );

         if (!currentRecord) {
            alertMessageError('Invalid ID');
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
                  records.map((r: any) =>
                     r.id === currentRecordId ? { ...r, ...record } : r
                  )
               );
               alertSuccess('Updated user successfully');
               console.log('Updated user successfully');
            } else {
               console.error('Error updating user:', response.message);
            }
         } catch (error: any) {
            console.error('Error sending request:', error.message);
         }
      } else {
         try {
            const response = await sendRequest('POST', 'api/users/add', record);

            if (response.success) {
               const newRecord = response.newUser;
               setRecords([...records, newRecord]);
               dispatch(updateCountingUsers());
               alertSuccess('User added successfully');
               console.log('User added successfully:', newRecord);
            } else {
               console.error('Error adding new user:', response.message);
            }
         } catch (error: any) {
            console.error('Error sending request:', error.message);
         }
      }
   };

   const handleDeactivate = async (record: any) => {
      try {
         const userId = record.id;

         if (records.length === 0) {
            console.log('No records available for operation');
            return;
         }

         const response = await sendRequest(
            'PATCH',
            `api/users/${userId}/deactivate`
         );

         if (response.success) {
            setRecords((prevRecords: any) =>
               prevRecords.map((r: any) =>
                  r.id === record.id ? { ...r, isActive: false } : r
               )
            );
            alertSuccess('User deactivated successfully');
            console.log('User deactivated successfully');
         } else {
            console.error('Error deactivated user:', response.message);
         }
      } catch (error: any) {
         console.error('Failed to deactivated user:', error.message);
      }
   };

   const handleActivate = async (record: any) => {
      try {
         const userId = record.id;

         if (records.length === 0) {
            console.log('No records available for operation');
            return;
         }

         const response = await sendRequest(
            'PATCH',
            `api/users/${userId}/activate`
         );

         if (response.success) {
            setRecords((prevRecords: any) =>
               prevRecords.map((r: any) =>
                  r.id === record.id ? { ...r, isActive: true } : r
               )
            );
            alertSuccess('User activated successfully');
            console.log('User activated successfully');
         } else {
            console.error('Error activated user:', response.message);
         }
      } catch (error: any) {
         console.error('Failed to activated user:', error.message);
      }
   };

   const handleLimitChange = (newLimit: number) => {
      setLimitPage(newLimit);
      setCurrentPage(1);
   };

   const columns = columnsMainDash({
      handleView,
      handleEditClick,
      handleDeactivate,
      handleActivate,
   });

   return (
      <main className={`main-dashboard-container`}>
         <h1 className={`title-page ${darkMode ? 'darkmode' : ''} `}>
            Dashboard
         </h1>
         <Suspense fallback={<Spin />}>
            <DashboardBoxChart />
         </Suspense>

         <div className='combined-stats-container'>
            <TopRevenueStats />
            <TodolistStats />
            <ProgressChartStats />
         </div>

         {calendar && <MyCalendar />}

         <Spin spinning={status === 'loading'}>
            <Table
               title='List Users'
               columns={columns}
               data={filterData(searchTerm, records)}
               searchBox={searchBox(searchTerm, setSearchTerm)}
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
               pagination={{
                  limitPage,
                  currentPage,
                  totalPages,
                  onPageChange: setCurrentPage,
                  onLimitChange: handleLimitChange,
               }}
            />
         </Spin>
      </main>
   );
};

export default MainDash;
