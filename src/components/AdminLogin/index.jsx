import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UilFacebook, UilGoogle, UilTwitter } from '@iconscout/react-unicons';
import './adminLogin.css';
import adminACC from '../../Data/adminACC';

const Login = () => {
   const navigate = useNavigate();

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [username, setUsername] = useState('');
   const [active, setActive] = useState(false);
   const [isLoginPage, setIsLoginPage] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();

      if (isLoginPage) {
         if (email === adminACC.username && password === adminACC.password) {
            localStorage.setItem('user', JSON.stringify({ email, password }));
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/home');
            console.log('Đăng nhập thành công!');
         } else {
            console.log('Đăng nhập thất bại. Sai tên đăng nhập hoặc mật khẩu.');
         }
      } else {
         console.log('Đăng ký thành công!');
      }
      cleanInform();
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
                           setActive(!active);
                           setIsLoginPage(true);
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
