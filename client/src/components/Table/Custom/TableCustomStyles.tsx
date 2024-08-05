import { TableStyles } from 'react-data-table-component';

const TableCustomStyles: TableStyles = {
   table: {
      style: {
         minHeight: '300px',
      },
   },
   rows: {
      style: {
         minHeight: '50px',
      },
   },
   headCells: {
      style: {
         fontSize: '1.2rem',
         fontWeight: 'bold',
         textTransform: 'capitalize', // Giá trị hợp lệ
      },
   },
};

export { TableCustomStyles };
