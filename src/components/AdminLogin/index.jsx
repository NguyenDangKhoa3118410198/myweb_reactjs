import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UilFacebook, UilGoogle, UilTwitter } from '@iconscout/react-unicons';
import './adminLogin.css';
import axios from 'axios';

const Login = () => {
   const navigate = useNavigate();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [username, setUsername] = useState('');
   const [active, setActive] = useState(false);
   const [isLoginPage, setIsLoginPage] = useState(true);

   useEffect(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         if (isLoginPage) {
            await handleApiCall('login', { email, password });
         } else {
            await handleApiCall('register', { email, password, username });
         }
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
            const token = data.token;
            localStorage.setItem('authToken', token);
            localStorage.setItem('isAuthenticated', 'true');

            navigate('/home');
            alert(data.message);
         } else {
            alert(data.message);
         }
      } catch (error) {
         console.error('Lỗi khi gọi API:', error);
      }
   };

   const cleanInform = () => {
      setEmail('');
      setPassword('');
      if (!isLoginPage) {
         setUsername('');
      }
   };

   return (
      <div className='wrapper-admin-login'>
         <div
            className={`admin-login-container ${active ? 'active' : ''}`}
            id='admin-login-container'
         >
            <div className='admin-form-container admin-sign-up'>
               <form onSubmit={handleSubmit}>
                  <h1>Create Account</h1>
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
                  <span>or use your email for registeration</span>
                  <input
                     type='text'
                     placeholder='Name'
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     required
                  />
                  <input
                     type='email'
                     placeholder='Email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
                  <input
                     type='password'
                     placeholder='Password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
                  <button>Sign Up</button>
               </form>
            </div>
            <div className='admin-form-container admin-sign-in'>
               <form onSubmit={handleSubmit}>
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
                  <input
                     type='email'
                     placeholder='Email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
                  <input
                     type='password'
                     placeholder='Password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
                  <div>Forget Your Password?</div>
                  <button>Sign In</button>
               </form>
            </div>
            <div className='toggle-container'>
               <div className='toggle'>
                  <div className='toggle-panel toggle-left'>
                     <h1>Welcome Back!</h1>
                     <p>
                        Enter your personal details to use all of site features
                     </p>
                     <button
                        className='hidden'
                        id='login'
                        onClick={() => {
                           setIsLoginPage(true);
                           setActive(!active);
                        }}
                     >
                        Sign In
                     </button>
                  </div>
                  <div className='toggle-panel toggle-right'>
                     <h1>Hello, Friend!</h1>
                     <p>
                        Register with your personal details to use all of site
                        features
                     </p>
                     <button
                        className='hidden'
                        id='register'
                        onClick={() => {
                           setActive(!active);
                           setIsLoginPage(false);
                        }}
                     >
                        Sign Up
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
