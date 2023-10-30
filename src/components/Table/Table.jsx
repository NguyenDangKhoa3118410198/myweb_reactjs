import React from 'react';
import DataTable from 'react-data-table-component';

import './table.css';
import { TableCustomStyles } from './Custom/TableCustomStyles';

const Table = ({ title, columns, data, searchBox }) => {
   return (
      <div className='wrapper'>
         <DataTable
            title={title ? title : 'List table ....'}
            subHeader
            subHeaderComponent={searchBox}
            columns={columns}
            data={data}
            // fixedHeader
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
