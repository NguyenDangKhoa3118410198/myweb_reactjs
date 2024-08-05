import { CSVLink } from 'react-csv';
import { Button } from 'react-bootstrap';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import './table.css';

interface IExportButton {
   headers: { label: string; key: string }[];
   title: string;
   data: any[];
}

const ExportCSV: React.FC<IExportButton> = ({ headers, title, data }) => {
   return (
      <Button type='button' className='btn btn-add export-csv'>
         <CSVLink
            headers={headers}
            data={data}
            filename={title ? `${title}.csv` : 'data.csv'}
         >
            <div className='export-search-container'>
               <VerticalAlignBottomOutlined />
               Export
            </div>
         </CSVLink>
      </Button>
   );
};

export default ExportCSV;
