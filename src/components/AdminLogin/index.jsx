import React, { useState } from 'react';
import { UilFacebook, UilGoogle, UilTwitter } from '@iconscout/react-unicons';
import './adminLogin.css';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(`Email: ${email}, Password: ${password}`);
   };

   return (
      <div className='login-wrapper'>
         <div className='admin-form-container'>
            <h1 className='name-form'>LOG IN</h1>
            <form className='admin-form' onSubmit={handleSubmit}>
               <div className='input-field'>
                  <label className='label-input' htmlFor='emailInput'>
                     Email
                  </label>
                  <input
                     id='emailInput'
                     type='text'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder='Enter your email'
                     required
                  />
               </div>
               <div className='input-field'>
                  <label className='label-input' htmlFor='passwordInput'>
                     Password
                  </label>
                  <input
                     id='passwordInput'
                     type='password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder='Enter your password'
                     required
                  />
               </div>

               <button className='btn-login' type='submit'>
                  Login
               </button>
            </form>
            <p className='forgot-password'>Forgot your password ?</p>
            <div className='other-login'>
               <UilFacebook className='item-login' />
               <UilGoogle className='item-login' />
               <UilTwitter className='item-login' />
            </div>
         </div>
      </div>
   );
};

export default Login;
