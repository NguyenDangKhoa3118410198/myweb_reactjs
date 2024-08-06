import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { columnsProduct1 } from '../../Data/columns';
import Table from '../../components/Table/Table';
import {
   searchBox,
   removeExtraSpaces,
} from '../../components/Table/TableActions/handleActions';

import './product.css';
import {
   fetchProducts,
   fetchReviewProduct,
} from 'components/features/thunk/thunk';
import { Spin } from 'antd';
import { AppDispatch, RootState } from 'components/features/store';

const Products = () => {
   const darkMode = useSelector((state: RootState) => state.darkMode);

   const [products, setProducts] = useState<any>([]);
   const [searchTerm, setSearchTerm] = useState('');

   const [isModalReview, setModalReview] = useState(false);
   const [isListReviews, setIsListReviews] = useState<any>([]);

   const [isModalView, setModalView] = useState<boolean>(false);
   const [viewCurrent, setViewCurrent] = useState({});
   const dispatch = useDispatch<AppDispatch>();
   const { products: reduxProducts, status: statusProducts } = useSelector(
      (state: RootState) => state.root.product
   );

   const { reviews: reduxReviews } = useSelector(
      (state: RootState) => state.root.review
   );
   useEffect(() => {
      setIsListReviews(reduxReviews);
   }, [reduxReviews]);

   useEffect(() => {
      setProducts(reduxProducts);
   }, [reduxProducts]);

   useEffect(() => {
      dispatch(fetchProducts()); // get list products
   }, [dispatch]);

   function filterData(records: any) {
      return records.filter((row: any) =>
         Object.values(row).some(
            (value) =>
               typeof value === 'string' &&
               value
                  .toLowerCase()
                  .includes(removeExtraSpaces(searchTerm.toLowerCase()))
         )
      );
   }

   const handleReview = (record: any) => {
      dispatch(fetchReviewProduct(record.id));
      setModalReview(true);
   };

   const handleView = (record: any) => {
      setModalView(true);
      setViewCurrent(record);
   };

   const columns = columnsProduct1({
      handleView,
      handleReview,
   });

   return (
      <main
         className={`product-wrapper main-container ${
            darkMode ? 'darkmode' : ''
         }`}
      >
         <Spin spinning={statusProducts === 'loading'}>
            <Table
               title={'List products'}
               columns={columns}
               data={filterData(products)}
               searchBox={searchBox(searchTerm, setSearchTerm)}
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
      </main>
   );
};

export default Products;
