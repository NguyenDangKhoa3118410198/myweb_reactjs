import moment from 'moment';

export const deleteLocalStorage = () => {
   localStorage.removeItem('authToken');
   localStorage.removeItem('refreshToken');
   localStorage.removeItem('isAuthenticated');
   localStorage.removeItem('username');
   localStorage.removeItem('avatarUrl');
   localStorage.removeItem('customerInfo');
   // localStorage.clear();
};

export const getObjectFromLocalStorage = (key: any) => {
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

export const formattedDateAndTime = (datetime: any) => {
   const date = moment(datetime).format('YY/MM/DD');
   const time = moment(datetime).format('h:mm A');
   return { date, time };
};

export const formattedBirthDay = (datetime: any) => {
   return moment(datetime).format('YYYY-MM-DD');
};

export const formatCamelCase = (text: string): string => {
   return text.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const capitalizeFirstLetter = (str: string): string => {
   return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatAndCapitalize = (text: string): string => {
   if (text === 'dateOfBirth') return 'Birthday';
   const formattedText = formatCamelCase(text);

   return capitalizeFirstLetter(formattedText);
};
