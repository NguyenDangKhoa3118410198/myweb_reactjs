import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
const apiUrl = 'http://localhost:4000';

const api = axios.create({
   baseURL: apiUrl,
});

let isRefreshingToken = false;

const checkAndRefreshToken = async () => {
   const token = localStorage.getItem('authToken');
   const refreshToken = localStorage.getItem('refreshToken');

   console.log('client token: ', token);

   if (!token) {
      console.log('Token does not exist. No need to refresh.');
      return;
   }

   if (isRefreshingToken) {
      console.log('Token refresh is already in progress');
      return;
   }

   try {
      isRefreshingToken = true;

      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime > decodedToken.exp) {
         console.log('client token expried');

         if (!refreshToken) {
            redirectToLogin();
            return;
         }

         if (refreshToken) {
            const decodedToken = jwtDecode(refreshToken);
            const currentTime = Date.now() / 1000;

            if (currentTime > decodedToken.exp) {
               console.log('client refresh token expried');
               redirectToLogin();
               return;
            }
         }

         const response = await api.post('auth/refreshToken', {
            refreshToken: localStorage.getItem('refreshToken'),
         });

         const newToken = response.data.accessToken;

         localStorage.setItem('authToken', newToken);
      }
   } catch (error) {
      console.log('logout now');
   } finally {
      isRefreshingToken = false;
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

const redirectToLogin = () => {
   console.log('Refresh token is missing. Redirecting to login.');
   window.location.href = '/login';
};

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

export const sendRequest = async (method, path, data = {}) => {
   try {
      const response = await api[method.toLowerCase()](path, data);

      if (response.status >= 200 && response.status < 300) {
         return response.data;
      } else {
         console.error(
            'Error fetching: ',
            response.status,
            response.statusText
         );
         throw new Error(`Request failed with status ${response.status}`);
      }
   } catch (error) {
      console.error('Error fetching: ', error);
      throw error;
   }
};
