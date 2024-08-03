import React, { useState } from 'react';
import axios from 'axios';
import { alertMessage, alertMessageError } from '../../ulti/modals';

import './forgotPassword.css';

const ForgotPasswordForm = () => {
   const [email, setEmail] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post(
            `https://react-backend-two.vercel.app/auth/login/reset-password`,
            { email }
         );

         if (response.data.success) {
            alertMessage(response.data.message);
         }
      } catch (error) {
         alertMessageError(error.response.data.message);
      }
   };

   return (
      <div className='forgot-password-form-container'>
         <form onSubmit={handleSubmit} className='forgot-password-form'>
            <h2>Forgot Password</h2>
            <label className='lbl-reset-pwd'>
               You need to enter a valid email to reset your password
               <input
                  className='input-reset-pwd'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter Email'
                  required
               />
            </label>
            <button type='submit'>Send Request</button>
         </form>
      </div>
   );
};

export default ForgotPasswordForm;
