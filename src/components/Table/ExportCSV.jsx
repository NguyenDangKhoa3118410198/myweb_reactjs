import React from 'react';
import { CSVLink } from 'react-csv';
import { UilFileExport } from '@iconscout/react-unicons';
import './table.css';

function ExportCSV({ headers, title, data }) {
   return (
      <button type='button' className='btn btn-add export-csv'>
         <CSVLink
            headers={headers}
            data={data}
            filename={title ? `${title}.csv` : 'data.csv'}
         >
            <div className='export-search-container'>
               <UilFileExport />
               Export
            </div>
         </CSVLink>
      </button>
   );
}

export default ExportCSV;
