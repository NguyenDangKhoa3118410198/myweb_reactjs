import axios from 'axios';
const apiUrl = 'http://localhost:4000';
const token = localStorage.getItem('authToken');

export const generateAuthHeader = () => {
   const token = localStorage.getItem('authToken');

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
      if (error.response && error.response.status === 403) {
         try {
            await refreshToken();
            const retryResponse = await axios({
               method,
               url: `${apiUrl}/${endpoint}`,
               data,
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                  ...headers,
               },
            });
            return retryResponse.data;
         } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            return null;
         }
      }
      console.error('Error sending request:', error);

      throw error;
   }
};

const refreshToken = async () => {
   try {
      const refreshResponse = await axios.post(
         'http://localhost:4000/auth/refreshToken',
         { refreshToken: localStorage.getItem('refreshToken') }
      );
      localStorage.setItem('authToken', refreshResponse.data.accessToken);
   } catch (refreshError) {
      // console.error('Error refreshing token:', refreshError);
      // throw refreshError;
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
