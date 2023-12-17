import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { pageProducts1 } from '../../Data/fetchData';
import { columnsProduct1 } from '../../Data/columns';
import Table from '../../components/Table/Table';
import {
   searchBox,
   removeExtraSpaces,
} from '../../components/Table/TableActions/handleActions';
import OnTopButton from '../../components/OnTop/OnTop';
import { pageReviewProduct } from '../../Data/fetchData';

import './product.css';
function Products() {
   const darkMode = useSelector((state) => state.darkMode);

   const [products, setProducts] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

   const [isModalReview, setModalReview] = useState(false);
   const [isListReviews, setIsListReviews] = useState([]);

   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});

   useEffect(() => {
      pageProducts1(setProducts);
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

   const handleReview = (record) => {
      pageReviewProduct(record.id, setIsListReviews);
      setModalReview(true);
   };

   const handleView = (record) => {
      setModalView(true);
      setViewCurrent(record);
   };

   const columns = columnsProduct1({
      handleView,
      handleReview,
   });

   return (
      <main className={`product-wrapper  ${darkMode ? 'darkmode' : ''}`}>
         <div id='top' style={{ opacity: '0' }}></div>

         <Table
            title={'List products'}
            columns={columns}
            data={filterData(products)}
            searchBox={searchBox(searchTerm, setSearchTerm)}
            setModalView={setModalView}
            tableActions={{
               setModalView,
               viewCurrent,
               isModalView,
               setModalReview,
               isListReviews,
               isModalReview,
            }}
         />

         <OnTopButton />
      </main>
   );
}

export default Products;
