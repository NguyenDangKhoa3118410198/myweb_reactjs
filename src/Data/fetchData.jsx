import { sendRequest } from '../ulti/sendHeaderRequest';

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

export const pageProducts1 = async (setRecords) => {
   try {
      let records = [{}];
      records = await sendRequest('GET', 'api/products');
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const pageProducts2 = async (setRecords) => {
   try {
      let records = [{}];
      records = await sendRequest('GET', 'api/users');
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
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

export const pageReview = async (productId, setRecords) => {
   try {
      let records = [{}];
      records = await sendRequest('GET', `api/products/${productId}/review`);
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};
