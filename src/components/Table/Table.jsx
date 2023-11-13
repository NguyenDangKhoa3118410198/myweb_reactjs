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
   tableActions = {},
   handleActions = {},
}) => {
   let { isModalView, isEditPanelOpen, isAddPanelOpen } = tableActions;
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
            subHeaderComponent={searchBox}
            columns={columns}
            data={data}
            fixedHeaderScrollHeight='300px'
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
