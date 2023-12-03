import axios from 'axios';
import { API } from './API';
import { sendRequest } from '../ulti/sendHeaderRequest';

import { v4 as uuidv4 } from 'uuid';

export const pageOrders = async (setRecords) => {
   try {
      let records = [{}];
      records = await sendRequest('GET', 'api/orders');
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const pageMainDash = async (setRecords) => {
   try {
      let records = [{}];
      records = await sendRequest('GET', 'api/users');
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const pageProducts1 = (setRecords) => {
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

         setRecords(productData);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   fetchData();
};

export const pageProducts2 = (setRecords) => {
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
};

export const pageCustomers = async (setRecords) => {
   try {
      let records = [{}];
      records = await sendRequest('GET', 'api/customers');
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const pageReview = (productId, setRecords) => {
   const fetchData = async () => {
      try {
         const response = await fetch(API.reviewAPI(productId));
         const data = await response.json();

         const reivewData = data.data.map((reivew) => ({
            id: reivew.id,
            title: reivew.title,
            content: reivew.content,
            rating: reivew.rating,
            customerId: reivew.customer_id,
         }));

         setRecords(reivewData);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   fetchData();
};
