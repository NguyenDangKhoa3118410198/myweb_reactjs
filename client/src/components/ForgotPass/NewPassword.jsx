import React, { useState } from 'react';
import axios from 'axios';
import { alertSuccess, alertMessageError } from '../../ulti/modals';

import './forgotPassword.css';

const NewPassword = () => {
   const [newPassword, setNewPassword] = useState('');
   const [code, setCode] = useState('');

   const clearForm = () => {
      setNewPassword('');
      setCode('');
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post(
            `http://localhost:4000/auth/login/reset-password/confirm`,
            { newPassword, code }
         );

         if (response.data.success) {
            alertSuccess('Password reset successful');
            clearForm();
         } else {
            alertMessageError(response.data.message);
         }
      } catch (error) {
         console.error('An error occurred:', error.message);
      }
   };

   return (
      <div className='forgot-password-form-container'>
         <form onSubmit={handleSubmit} className='forgot-password-form'>
            <label>
               New Password:
               <input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
               />
            </label>
            <label>
               Reset Code:
               <input
                  type='text'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
               />
            </label>
            <button type='submit'>Reset Password</button>
         </form>
      </div>
   );
};

export default NewPassword;
