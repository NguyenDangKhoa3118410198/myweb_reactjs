import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { columnsProduct, columnsProduct1 } from '../../Data/columns';
import axios from 'axios';
import Table from '../../components/Table/Table';
import { v4 as uuidv4 } from 'uuid';
import { API } from '../../Data/API';
import {
   searchBox,
   removeExtraSpaces,
} from '../../components/Table/TableActions/handleActions';

import './product.css';
function Products() {
   const darkMode = useSelector((state) => state.darkMode);

   const [records, setRecords] = useState([]);
   const [products, setProducts] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(API.productAPI);
            const data = await response.json();

            const productData = data.data.map((product) => ({
               id: product.id,
               sku: product.sku,
               name: product.name,
               urlPath: product.url_path,
               originPrice: product.original_price,
            }));

            setProducts(productData);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();
   }, []); // Chỉ gọi API khi component được mount lần đầu

   useEffect(() => {
      axios
         .get('https://jsonplaceholder.typicode.com/users')
         .then((response) => {
            const updatedData = response.data.map((user) => {
               return {
                  id: uuidv4(),
                  name: user.name,
                  username: user.username,
                  email: user.email,
               };
            });
            setRecords(updatedData);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

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
      </main>
   );
}

export default Products;
