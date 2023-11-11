import React, { useState, useEffect } from 'react';
import { columnsProduct, columnsProduct1 } from '../../Data/columns';
import axios from 'axios';
import Table from '../../components/Table/Table';
import { v4 as uuidv4 } from 'uuid';
import { API } from '../../Data/API';

import './product.css';
function Products() {
   const [records, setRecords] = useState([]);
   const [products, setProducts] = useState([]);

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

   return (
      <main className='product-container'>
         <div className='product-table-item1'>
            <Table columns={columnsProduct1} data={products} />
         </div>
         <div className='product-table-item2'>
            <Table columns={columnsProduct} data={records} />
         </div>
      </main>
   );
}

export default Products;
