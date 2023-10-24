import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Table/Table';

import { columnsProduct } from '../../Data/columns';
import './product.css';
function Products() {
   const [records, setRecords] = useState([]);
   useEffect(() => {
      axios
         .get('https://jsonplaceholder.typicode.com/users')
         .then((response) => {
            const updatedData = response.data.map((user) => {
               return {
                  id: user.id,
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
            <Table columns={columnsProduct} data={records} />
         </div>
         <div className='product-table-item2'>
            <Table columns={columnsProduct} data={records} />
         </div>
      </main>
   );
}

export default Products;
