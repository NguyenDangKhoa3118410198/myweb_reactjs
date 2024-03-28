import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
   UilFacebook,
   UilGoogle,
   UilTwitter,
   UilEyeSlash,
   UilEye,
} from '@iconscout/react-unicons';
import axios from 'axios';
import { deleteLocalStorage } from '../../ulti';
import { alertSuccess, alertMessageError } from '../../ulti/modals';

import AdminImage from '../../imgs/logo-admin-login.png';
import './adminLogin.css';

const Login = () => {
   const navigate = useNavigate();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

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
            const customerInfo = JSON.stringify(data.customerInfo);

            localStorage.setItem('authToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('username', data.username);
            localStorage.setItem('customerInfo', customerInfo);
            navigate('/home');
            alertSuccess(data.message);
         }
      } catch (error) {
         alertMessageError(error.response.data.message);
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
               <div className='right-admin-form-container'>
                  <img
                     className='image-admin-form'
                     src={AdminImage}
                     alt='Error'
                  />
               </div>
            </div>
            <div className='admin-form-container admin-sign-in'>
               <form onSubmit={handleSubmit}>
                  <div className='base-inform-login'>
                     <h1>Sign In</h1>
                     <p>Welcome back</p>
                     <div className='social-icons'>
                        <div className='admin-platform-icon'>
                           <UilFacebook />
                        </div>
                        <div className='admin-platform-icon'>
                           <UilGoogle />
                        </div>
                        <div className='admin-platform-icon'>
                           <UilTwitter />
                        </div>
                     </div>
                     <p>or use your email password</p>
                  </div>
                  <div className='floating-label'>
                     <input
                        id='admin-email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=''
                        autoFocus
                        required
                     />
                     <label htmlFor='admin-email'>Email</label>
                  </div>

                  <div className='container-hidden-pwd floating-label'>
                     <input
                        id='admin-password'
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=''
                        required
                     />
                     <label htmlFor='admin-password'>Password</label>
                     <div
                        className='btn-hidden-pwd'
                        onClick={() => setShowPassword(!showPassword)}
                     >
                        {showPassword ? <UilEyeSlash /> : <UilEye />}
                     </div>
                  </div>
                  <div className='more-action-login-form'>
                     <div className='rememeber-checkbox-container'>
                        <input type='checkbox' id='rememberCheckbox' />
                        <label htmlFor='rememberCheckbox'>Remember me</label>
                     </div>

                     <div className='forgot-password-container'>
                        <Link to='/forgot-password' className='forgot-password'>
                           Forgot Your Password?
                        </Link>
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
