import React from 'react';
import DataTable from 'react-data-table-component';

import './table.css';
import { TableCustomStyles } from './Custom/TableCustomStyles';
import ModalView from './ModalView';
// import FormPanel from '../../pages/MainDash/FormPanel';

const Table = ({
   title,
   columns,
   data,
   searchBox,
   setModalView,
   viewCurrent,
   formData,
   setFormData,
   FormPanel,
   tableActions,
   handleActions = {},
}) => {
   let {
      isModalView,
      isEditPanelOpen,
      isAddPanelOpen,
      setIsAddPanelOpen,
      setIsEditPanelOpen,
   } = tableActions || {};
   let { handleSubmit, handleEdit, handleClose } = handleActions;

   return (
      <div className='wrapper'>
         <div className='form-panel-action'>
            <ModalView
               show={isModalView}
               onHide={() => setModalView(false)}
               viewcurrent={viewCurrent ? viewCurrent : 'Not Found'}
            />
            {isAddPanelOpen && (
               <FormPanel
                  title='Add'
                  handleSubmit={handleSubmit}
                  formData={formData}
                  setFormData={setFormData}
                  handleClose={handleClose}
               />
            )}
            {isEditPanelOpen && (
               <FormPanel
                  title='Edit'
                  handleSubmit={handleEdit}
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
                        }}
                     >
                        Add
                     </button>
                     {searchBox}
                  </div>
               ) : (
                  searchBox
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
