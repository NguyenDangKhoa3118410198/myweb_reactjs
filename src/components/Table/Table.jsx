import React from 'react';
import DataTable from 'react-data-table-component';
import { headerCsv } from './TableActions/handleActions';
import './table.css';
import { TableCustomStyles } from './Custom/TableCustomStyles';
import ModalView from './ModalView';
import ModalReviews from './ModelReviews';
import ExportCSV from './ExportCSV';

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
                        position: 'relative',
                        padding: '0px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0',
                        top: '0',
                     }}
                  >
                     {setIsAddPanelOpen ? (
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
                     <ExportCSV headers={headers} title={title} data={data} />
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
            striped
            className='react-table'
         />
      </div>
   );
};

export default Table;
