import axios from 'axios';

const apiBaseUrl = 'http://localhost:4000'; // Điều chỉnh URL API của bạn

const sendAuthenticatedRequest = async (
   method,
   endpoint,
   requestData = null
) => {
   const authToken = localStorage.getItem('authToken'); // Lấy token từ localStorage

   const headers = {
      'Content-Type': 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : '', // Gửi token nếu tồn tại
   };

   try {
      const response = await axios({
         method: method,
         url: `${apiBaseUrl}${endpoint}`,
         headers: headers,
         data: requestData,
      });

      return response.data;
   } catch (error) {
      console.error('Error sending authenticated request:', error);
      throw error;
   }
};

export default sendAuthenticatedRequest;
