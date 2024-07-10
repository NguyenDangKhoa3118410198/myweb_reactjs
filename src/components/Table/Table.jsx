import React, { useRef } from 'react';
import DataTable from 'react-data-table-component';
import { headerCsv } from './TableActions/handleActions';
import { TableCustomStyles } from './Custom/TableCustomStyles';
import ModalView from './Modals/ModalView';
import ModalReviews from './Modals/ModalReviews';
import ExportCSV from './ExportCSV';
import './table.css';
import { useSelector } from 'react-redux';
import { LoadingData } from '../Loading';

const Table = ({
   title,
   columns,
   data,
   searchBox,
   formData,
   setFormData,
   FormPanel,
   tableActions,
   handleActions = {},
}) => {
   let {
      setModalReview,
      setModalView,
      viewCurrent,
      isModalView,
      isEditPanelOpen,
      isAddPanelOpen,
      isModalReview,
      isListReviews,
      setIsAddPanelOpen,
      setIsEditPanelOpen,
      setCurrentRecordId,
   } = tableActions || {};
   let { handleSubmitAndEdit, handleClose } = handleActions;

   const headers = headerCsv(data);
   const targetRef = useRef(null);
   const loading = useSelector((state) => state.loading.loading);
   const scrollToElement = () => {
      if (targetRef.current) {
         targetRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   };

   return (
      <div className='wrapper'>
         <div className='form-panel-action'>
            {setModalReview && isListReviews && (
               <ModalReviews
                  show={isModalReview}
                  onHide={() => setModalReview(false)}
                  viewcurrent={viewCurrent ? viewCurrent : 'Not Found'}
                  data={isListReviews}
               />
            )}
            <ModalView
               show={isModalView}
               onHide={() => setModalView(false)}
               viewcurrent={viewCurrent ? viewCurrent : 'Not Found'}
            />
            {isAddPanelOpen && (
               <FormPanel
                  title='Add'
                  targetRef={targetRef}
                  handleSubmit={handleSubmitAndEdit}
                  formData={formData}
                  setFormData={setFormData}
                  handleClose={handleClose}
               />
            )}
            {isEditPanelOpen && (
               <FormPanel
                  title='Edit'
                  handleSubmit={handleSubmitAndEdit}
                  formData={formData}
                  setFormData={setFormData}
                  handleClose={handleClose}
               />
            )}
         </div>

         <LoadingData loading={loading}>
            <DataTable
               title={title ? title : 'List table ....'}
               subHeader
               subHeaderComponent={
                  tableActions ? (
                     <div className='custom-data-table'>
                        {setIsAddPanelOpen ? (
                           <button
                              type='button'
                              className='btn btn-add'
                              onClick={() => {
                                 setIsAddPanelOpen(true);
                                 setIsEditPanelOpen(false);
                                 setCurrentRecordId(null);
                                 scrollToElement();
                              }}
                           >
                              Add
                           </button>
                        ) : null}
                        <div className='right-data-table'>
                           <ExportCSV
                              headers={headers}
                              title={title}
                              data={data}
                           />
                           {searchBox}
                        </div>
                     </div>
                  ) : (
                     <div className='right-data-table'>
                        <ExportCSV
                           headers={headers}
                           title={title}
                           data={data}
                        />
                        {searchBox}
                     </div>
                  )
               }
               columns={columns}
               data={data}
               fixedHeaderScrollHeight='300px'
               highlightOnHover
               pointerOnHover
               pagination
               paginationPerPage={5}
               paginationResetDefaultPage={1}
               paginationRowsPerPageOptions={[5, 10]}
               paginationComponentOptions={{
                  rowsPerPageText: 'Records per page:',
                  rangeSeparatorText: 'out of',
               }}
               customStyles={TableCustomStyles}
               striped
               className='react-table'
            />
         </LoadingData>
      </div>
   );
};

export default Table;
