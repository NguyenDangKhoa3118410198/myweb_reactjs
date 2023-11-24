import axios from 'axios';
import { API } from './API';

import { v4 as uuidv4 } from 'uuid';

export const pageOrders = (setRecords) => {
   axios
      .get('https://dummyjson.com/carts')
      .then((response) => {
         const data = response.data;

         const infoProducts = data.carts
            .map((cart) => {
               return cart.products.map((product) => {
                  return {
                     id: uuidv4(),
                     title: product.title,
                     price: product.price,
                     amount: product.quantity,
                     total: product.total,
                  };
               });
            })
            .flat();
         setRecords(infoProducts);
      })
      .catch((error) => {
         console.log(error);
      });
};

export const pageMainDash = async (setRecords) => {
   try {
      const response = await axios.get(
         'http://localhost:4000/user/getAllUsers'
      );

      console.log(response.data);
      setRecords(response.data);
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

export const pageCustomers = (setRecords) => {
   axios
      .get('https://dummyjson.com/users')
      .then((response) => {
         const data = response.data;

         const infoCustomers = data.users.map((user) => {
            return {
               id: uuidv4(),
               firstName: user.firstName,
               lastName: user.lastName,
               maidenName: user.maidenName,
               age: user.age,
               gender: user.gender,
               email: user.email,
               phone: user.phone,
            };
         });
         setRecords(infoCustomers);
      })
      .catch((error) => {
         console.log(error);
      });
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
