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
            fixedHeaderScrollHeight="440px"
            pagination
            paginationPerPage={5}
            paginationResetDefaultPage={1}
            paginationRowsPerPageOptions={[5, 7]}
            paginationComponentOptions={{
               rowsPerPageText: "Records per page:",
               rangeSeparatorText: "out of",
            }}
            customStyles={TableCustomStyles}
         />
      </div>
   );
};

export default Table;
