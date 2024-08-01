import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { alertMessage } from '../ulti/modals';
const apiUrl = 'https://react-backend-two.vercel.app';

const api = axios.create({
   baseURL: apiUrl,
});

let isRefreshingToken = false;
let shouldSendRequest = true;

const checkAndRefreshToken = async () => {
   const token = localStorage.getItem('authToken');
   const refreshToken = localStorage.getItem('refreshToken');

   // console.log('client token: ', token);

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
               const response = await api.post('auth/logout');
               if (response.data.success) {
                  console.log('you are logout');
                  shouldSendRequest = false;
                  redirectToLogin();
                  return;
               }
            }
         }

         const response = await api.post('auth/refreshToken', {
            refreshToken: localStorage.getItem('refreshToken'),
         });

         const newToken = response.data.accessToken;
         const newRefreshToken = response.data.refreshToken;

         localStorage.setItem('authToken', newToken);
         localStorage.setItem('refreshToken', newRefreshToken);
      }
   } catch (error) {
      shouldSendRequest = false;
      console.log('logout now');
      redirectToLogin();
   } finally {
      isRefreshingToken = false;
   }
};

api.interceptors.request.use(
   async (config) => {
      await checkAndRefreshToken();
      if (shouldSendRequest) {
         config.headers.Authorization = `Bearer ${localStorage.getItem(
            'authToken'
         )}`;
      } else {
         return Promise.reject('Request canceled');
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

const redirectToLogin = () => {
   console.log('Refresh token is missing. Redirecting to login.');
   alertMessage('You need to log in again. Sorry for the inconvenience');
   window.location.href = '/login';
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
      if (error.response.data.requestLoginAgain) redirectToLogin();
      console.error('Error fetching: ', error);
      throw error;
   }
};
