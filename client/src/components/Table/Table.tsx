import React from 'react';
import DataTable from 'react-data-table-component';
import { headerCsv } from './TableActions/handleActions';
import { TableCustomStyles } from './Custom/TableCustomStyles';
import ModalView from './Modals/ModalView';
import ModalReviews from './Modals/ModalReviews';
import ExportCSV from './ExportCSV';
import { useSelector } from 'react-redux';
import { LoadingData } from '../Loading';
import PrimaryButton from 'components/common/ButtonComponent/ButtonPrimary';
import { PlusCircleOutlined } from '@ant-design/icons';
import './table.css';

interface ITableProps {
   title?: string;
   columns: any[];
   data: any[];
   searchBox: JSX.Element;
   formData?: any;
   setFormData?: any;
   FormPanel?: any;
   tableActions?: {
      setModalReview?: (value: boolean) => void;
      setModalView?: (value: boolean) => void;
      viewCurrent?: any;
      isModalView?: boolean;
      isEditPanelOpen?: boolean;
      isAddPanelOpen?: boolean;
      isModalReview?: boolean;
      isListReviews?: any[];
      setIsAddPanelOpen?: (open: boolean) => void;
      setIsEditPanelOpen?: (open: boolean) => void;
      setCurrentRecordId?: (id: any) => void;
   };
   handleActions?: {
      handleSubmitAndEdit?: (values: any) => void;
      handleClose?: () => void;
   };
   pagination?: {
      limitPage: number;
      currentPage: number;
      totalPages: number;
      onPageChange: (page: number) => void;
      onLimitChange: (page: number) => void;
   };
}
const Table: React.FC<ITableProps> = ({
   title,
   columns,
   data,
   searchBox,
   formData,
   setFormData,
   FormPanel,
   tableActions,
   handleActions = {},
   pagination,
}) => {
   const {
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
      setCurrentRecordId = () => {},
   } = tableActions || {};
   const { handleSubmitAndEdit, handleClose } = handleActions;

   const headers = headerCsv(data);
   const loading = useSelector((state: any) => state.loading.loading);

   return (
      <>
         <div className='wrapper'>
            <div className='form-panel-action'>
               {setModalReview && isListReviews && (
                  <ModalReviews
                     show={isModalReview ?? false}
                     onHide={() => setModalReview(false)}
                     data={isListReviews}
                  />
               )}
               {setModalView && (
                  <ModalView
                     show={isModalView ?? false}
                     onHide={() => setModalView(false)}
                     viewcurrent={viewCurrent ? viewCurrent : 'Not Found'}
                  />
               )}
            </div>

            <LoadingData loading={loading}>
               <DataTable
                  subHeader
                  subHeaderComponent={
                     tableActions ? (
                        <div className='custom-data-table'>
                           <div className='right-data-table'>
                              {setIsAddPanelOpen && (
                                 <PrimaryButton
                                    onClick={() => {
                                       setIsAddPanelOpen(true);
                                       setIsEditPanelOpen?.(false);
                                       setCurrentRecordId?.(null);
                                    }}
                                    label='Create'
                                    icon={<PlusCircleOutlined />}
                                 />
                              )}
                              {searchBox}
                              <ExportCSV
                                 headers={headers || []}
                                 title={title || 'data'}
                                 data={data}
                              />
                           </div>
                        </div>
                     ) : (
                        <div className='right-data-table'>
                           <ExportCSV
                              headers={headers || []}
                              title={title || 'data'}
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
                  paginationResetDefaultPage={true}
                  paginationPerPage={pagination?.limitPage}
                  paginationRowsPerPageOptions={[5, 10]}
                  customStyles={TableCustomStyles}
                  striped
                  paginationServer
                  paginationTotalRows={
                     (pagination?.totalPages ?? 1) *
                     (pagination?.limitPage ?? 1)
                  }
                  onChangePage={pagination?.onPageChange}
                  onChangeRowsPerPage={(newLimit) => {
                     pagination?.onLimitChange(newLimit);
                  }}
                  paginationDefaultPage={pagination?.currentPage}
               />
            </LoadingData>
         </div>
         {isAddPanelOpen && (
            <FormPanel
               title='Add'
               handleSubmit={(e: any) => {
                  handleSubmitAndEdit?.(e);
               }}
               formData={formData}
               handleClose={handleClose}
               isOpen={isAddPanelOpen}
            />
         )}
         {isEditPanelOpen && (
            <FormPanel
               title='Edit'
               handleSubmit={handleSubmitAndEdit}
               formData={formData}
               handleClose={handleClose}
               isOpen={isEditPanelOpen}
            />
         )}
      </>
   );
};

export default Table;
