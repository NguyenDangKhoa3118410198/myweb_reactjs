import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
const apiUrl = 'http://localhost:4000';
// const token = localStorage.getItem('authToken');

const api = axios.create({
   baseURL: apiUrl,
});

let isRefreshingToken = false;

const checkAndRefreshToken = async () => {
   const token = localStorage.getItem('authToken');
   console.log('client token: ', token);

   if (isRefreshingToken) {
      console.log('Token refresh is already in progress');
      return;
   }
   if (token) {
      try {
         isRefreshingToken = true;

         const decodedToken = jwtDecode(token);
         const currentTime = Math.floor(Date.now() / 1000);

         if (currentTime > decodedToken.exp) {
            console.log('client token expried');
            const response = await api.post('auth/refreshToken', {
               refreshToken: localStorage.getItem('refreshToken'),
            });

            const newToken = response.data.accessToken;
            // const newDecodedToken = jwtDecode(newToken);

            // Cập nhật token mới và thời gian hết hạn mới
            localStorage.setItem('authToken', newToken);
            // localStorage.setItem('tokenExpiration', newDecodedToken.exp);
         }
      } catch (error) {
         console.log('logout now');
      } finally {
         isRefreshingToken = false;
      }
   }
};

api.interceptors.request.use(
   async (config) => {
      await checkAndRefreshToken();

      config.headers.Authorization = `Bearer ${localStorage.getItem(
         'authToken'
      )}`;

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export const getUsers = async () => {
   try {
      const response = await api.get('/api/users');
      console.log('Users data:', response.data);
      return response.data;
   } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
   }
};
