import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UilFacebook, UilGoogle, UilTwitter } from '@iconscout/react-unicons';
import axios from 'axios';
import { deleteLocalStorage } from '../../ulti';
import { loginSuccess } from '../../ulti/modals';

import AdminImage from './3.png';
import './adminLogin.css';

const Login = () => {
   const navigate = useNavigate();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   useEffect(() => {
      deleteLocalStorage();
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await handleApiCall('login/admin', { email, password });
      } catch (error) {
         console.error(error);
      }

      cleanInform();
   };

   const handleApiCall = async (apiEndpoint, requestData) => {
      try {
         const response = await axios.post(
            `http://localhost:4000/auth/${apiEndpoint}`,
            requestData
         );
         const data = response.data;

         if (data.success) {
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;

            localStorage.setItem('authToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('username', data.username);
            navigate('/home');
            loginSuccess(data.message);
         }
      } catch (error) {
         console.error(
            'Server responded with an error:',
            error.response.data.message
         );
      }
   };

   const cleanInform = () => {
      setEmail('');
      setPassword('');
   };

   return (
      <div className='wrapper-admin-login'>
         <div className={`admin-login-container`} id='admin-login-container'>
            <div className='admin-form-container admin-sign-up'>
               <div
                  style={{
                     backgroundColor: 'transparent',
                     width: '100%',
                     height: '100%',
                     position: 'relative',
                     overflow: 'hidden',
                  }}
               >
                  <img
                     src={AdminImage}
                     alt=''
                     width='100%'
                     height='100%'
                     style={{
                        objectFit: 'cover',
                     }}
                  />
               </div>
            </div>
            <div className='admin-form-container admin-sign-in'>
               <form onSubmit={handleSubmit}>
                  <div className='base-inform-login'>
                     <h1>Sign In</h1>
                     <div className='social-icons'>
                        <div className='icon'>
                           <UilFacebook />
                        </div>
                        <div className='icon'>
                           <UilGoogle />
                        </div>
                        <div className='icon'>
                           <UilTwitter />
                        </div>
                     </div>
                     <span>or use your email password</span>
                  </div>

                  <input
                     type='email'
                     placeholder='Enter email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     autoFocus
                     required
                  />
                  <input
                     type='password'
                     placeholder='Enter password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
                  <div className='more-action-login-form'>
                     <div className='rememeber-checkbox-container'>
                        <input type='checkbox' id='rememberCheckbox' />
                        <label htmlFor='rememberCheckbox'>Remember me</label>
                     </div>

                     <div className='forgot-password-container'>
                        <a href='google.com' className='forgot-password'>
                           Forgot Your Password?
                        </a>
                     </div>
                  </div>
                  <button className='btn-sign-in'>Sign In</button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;
