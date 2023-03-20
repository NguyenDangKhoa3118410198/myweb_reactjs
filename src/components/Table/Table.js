import React from "react";
import DataTable from "react-data-table-component";

import "./Table.css";
import { TableCustomStyles } from "./Custom/TableCustomStyles";

const Table = ({ columns, data }) => {
   return (
      <div className="wrapper">
         <DataTable
            columns={columns}
            data={data}
            fixedHeader
            pagination
            paginationPerPage={5}
            paginationResetDefaultPage={1}
            paginationRowsPerPageOptions={[]}
            customStyles={TableCustomStyles}
         />
      </div>
   );
};

export default Table;
