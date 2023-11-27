import axios from 'axios';
const apiUrl = 'http://localhost:4000';
const token = localStorage.getItem('authToken');

export const generateAuthHeader = (token) => {
   return {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
};

export const sendRequest = async (
   method,
   endpoint,
   data = null,
   headers = {}
) => {
   try {
      const response = await axios({
         method,
         url: `${apiUrl}/${endpoint}`,
         data,
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (error) {
      console.error('Error sending request:', error);
      throw error;
   }
};

// export const pageMainDash = async (setRecords) => {
//    try {
//       const response = await axios.get(
//          'http://localhost:4000/api/users',
//          generateAuthHeader()
//       );
//       setRecords(response.data);
//    } catch (error) {
//       console.error('Error fetching data:', error);
//    }
// };
