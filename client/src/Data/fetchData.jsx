import { sendRequest } from '../ulti/sendHeaderRequest';

export const pageProducts = async (setRecords) => {
   try {
      const records = await sendRequest('GET', 'api/products');
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const pageProducts2 = async (setRecords) => {
   try {
      const records = await sendRequest('GET', 'api/users');
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const pageCustomers = async (setRecords) => {
   try {
      const records = await sendRequest('GET', 'api/customers');
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const pageUsersDetail = async (setRecords) => {
   try {
      const records = await sendRequest('GET', 'api/userDetail');
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const pageReviewProduct = async (productId, setRecords) => {
   try {
      const records = await sendRequest(
         'GET',
         `api/products/${productId}/review`
      );
      setRecords(records);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const pageDetailOrder = async (orderId) => {
   try {
      const response = await sendRequest('GET', `api/orders/${orderId}/detail`);
      return response;
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

export const todoList = async (setRecords) => {
   try {
      const records = await sendRequest('GET', 'api/todo');
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
