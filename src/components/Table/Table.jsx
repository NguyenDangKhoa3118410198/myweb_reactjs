import React from 'react';
import DataTable from 'react-data-table-component';

import './table.css';
import { TableCustomStyles } from './Custom/TableCustomStyles';
import ModalView from './ModalView';
import { CSVLink } from 'react-csv';
import ModalReviews from './ModelReviews';
// import FormPanel from '../../pages/MainDash/FormPanel';

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

         <DataTable
            title={title ? title : 'List table ....'}
            subHeader
            subHeaderComponent={
               tableActions ? (
                  <div
                     style={{
                        padding: '0px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0',
                     }}
                  >
                     <button
                        type='button'
                        className='btn btn-add'
                        onClick={() => {
                           setIsAddPanelOpen(true);
                           setIsEditPanelOpen(false);
                           setCurrentRecordId(null);
                        }}
                     >
                        Add
                     </button>
                     <div className='right-data-table'>
                        <button
                           type='button'
                           className='btn btn-add export-csv'
                        >
                           <CSVLink
                              data={data}
                              filename={title ? `${title}.csv` : 'data.csv'}
                           >
                              Export CSV
                           </CSVLink>
                        </button>

                        {searchBox}
                     </div>
                  </div>
               ) : (
                  <div className='right-data-table'>
                     <button type='button' className='btn btn-add export-csv'>
                        <CSVLink
                           data={data}
                           filename={title ? `${title}.csv` : 'data.csv'}
                        >
                           Export CSV
                        </CSVLink>
                     </button>

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
            paginationRowsPerPageOptions={[5, 7]}
            paginationComponentOptions={{
               rowsPerPageText: 'Records per page:',
               rangeSeparatorText: 'out of',
            }}
            customStyles={TableCustomStyles}
            className='react-table'
         />
      </div>
   );
};

export default Table;
