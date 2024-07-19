import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columnsProduct1 } from '../../Data/columns';
import Table from '../../components/Table/Table';
import {
   searchBox,
   removeExtraSpaces,
} from '../../components/Table/TableActions/handleActions';
import OnTopButton from '../../components/OnTop/OnTop';

import './product.css';
import {
   fetchProducts,
   fetchReviewProduct,
} from 'components/features/thunk/thunk';
import { Spin } from 'antd';
function Products() {
   const darkMode = useSelector((state) => state.darkMode);

   const [products, setProducts] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

   const [isModalReview, setModalReview] = useState(false);
   const [isListReviews, setIsListReviews] = useState([]);

   const [isModalView, setModalView] = useState(false);
   const [viewCurrent, setViewCurrent] = useState({});
   const dispatch = useDispatch();
   const { products: reduxProducts, status: statusProducts } = useSelector(
      (state) => state.root.product
   );

   const { reviews: reduxReviews } = useSelector((state) => state.root.review);
   useEffect(() => {
      setIsListReviews(reduxReviews);
   }, [reduxReviews]);

   useEffect(() => {
      setProducts(reduxProducts);
   }, [reduxProducts]);

   useEffect(() => {
      dispatch(fetchProducts()); // get list products
   }, [dispatch]);

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
      dispatch(fetchReviewProduct(record.id));
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
         <Spin spinning={statusProducts === 'loading'}>
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
         </Spin>

         <OnTopButton />
      </main>
   );
}

export default Products;
