import moment from 'moment';

export const deleteLocalStorage = () => {
   // localStorage.removeItem('authToken');
   // localStorage.removeItem('refreshToken');
   // localStorage.removeItem('isAuthenticated');
   // localStorage.removeItem('username');
   // localStorage.removeItem('avatarUrl');
   // localStorage.removeItem('customerInfo');
   localStorage.clear();
};

export const getObjectFromLocalStorage = (key) => {
   const storedData = localStorage.getItem(key);

   if (storedData === null) {
      console.error(`No data found in localStorage with key: ${key}`);
      return null;
   }

   try {
      const object = JSON.parse(storedData);
      return object;
   } catch (error) {
      console.error(
         `Error parsing JSON string from localStorage with key ${key}:`,
         error
      );
      return null;
   }
};

export const formattedDate = (datetime) => {
   return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
};
