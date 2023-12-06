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
      // console.log(records);
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

export const todoList = async (setRecords) => {
   try {
      let records = [{}];
      records = await sendRequest('GET', 'api/todo');
      // console.log(records);
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const addTodo = async (task) => {
   try {
      const response = await sendRequest('POST', 'api/todo/add', task);
      return response;
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const deleteTodo = async (idTodo) => {
   try {
      const response = await sendRequest('DELETE', `api/todo/${idTodo}`);
      return response;
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const isCompletedTodo = async (idTodo) => {
   try {
      const response = await sendRequest('PATCH', `api/todo/${idTodo}/edit`);
      return response;
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};
