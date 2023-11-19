import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { pageProducts1, pageProducts2 } from '../../Data/fetchData';
import { columnsProduct, columnsProduct1 } from '../../Data/columns';
import Table from '../../components/Table/Table';
import {
   searchBox,
   removeExtraSpaces,
} from '../../components/Table/TableActions/handleActions';
import OnTopButton from '../../components/OnTop/OnTop';

import './product.css';
function Products() {
   const darkMode = useSelector((state) => state.darkMode);

   const [records, setRecords] = useState([]);
   const [products, setProducts] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => pageProducts1(setProducts), []);

   useEffect(() => pageProducts2(setRecords), []);

   function filterData(records) {
      return records.filter((row) =>
         Object.values(row).some(
            (value) =>
               typeof value === 'string' &&
               value
                  .toLowerCase()
                  .includes(removeExtraSpaces(searchTerm.toLowerCase()))
         )
      );
   }

   return (
      <main className={`product-wrapper  ${darkMode ? 'darkmode' : ''}`}>
         <div id='top' style={{ opacity: '0' }}></div>

         <div className='product-table-item1'>
            <Table
               title={'List products'}
               columns={columnsProduct1}
               data={filterData(products)}
               searchBox={searchBox(searchTerm, setSearchTerm)}
            />
         </div>
         <div className='product-table-item2'>
            <Table
               columns={columnsProduct}
               data={filterData(records)}
               searchBox={searchBox(searchTerm, setSearchTerm)}
            />
         </div>
         <OnTopButton />
      </main>
   );
}

export default Products;
