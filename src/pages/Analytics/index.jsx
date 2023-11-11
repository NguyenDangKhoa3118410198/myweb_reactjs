import { useState, useEffect, Fragment } from 'react';
import BreadcrumbExample from '../../components/Breadcrumb';
import './analytics.css';

function Analytics() {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(
               'https://tiki.vn/api/personalish/v1/blocks/listings?limit=100&categoryId=28454&category=28454'
            );
            const data = await response.json();

            // Lấy thông tin cần thiết từ dữ liệu nhận được
            const productData = data.data.map((product) => ({
               id: product.id,
               sku: product.sku,
               name: product.name,
            }));

            // Cập nhật state với mảng object
            setProducts(productData);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();
   }, []); // Chỉ gọi API khi component được mount lần đầu

   return (
      <Fragment>
         <BreadcrumbExample />;
         <main className='product-list'>
            <h1>Product List of : {products.length}</h1>
            <ul>
               {products.map((product) => (
                  <li key={product.id}>
                     <p>ID: {product.id}</p>
                     <p>SKU: {product.sku}</p>
                     <p>Name: {product.name}</p>
                  </li>
               ))}
            </ul>
         </main>
      </Fragment>
   );
}

export default Analytics;
