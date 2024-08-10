import { useState } from 'react';
import axios from 'axios';
import { Form, message } from 'antd';
import PrimaryButton from 'components/common/ButtonComponent/ButtonPrimary';
import InputText from 'components/common/InputComponent/InputText';
import InputPassword from 'components/common/InputComponent/InputPassword';
import './forgotPassword.css';

const NewPassword = () => {
   const [, setNewPassword] = useState('');
   const [, setCode] = useState('');

   const clearForm = () => {
      setNewPassword('');
      setCode('');
   };

   const handleSubmit = async (values: any) => {
      const { newPassword, code } = values;
      try {
         const response = await axios.post(
            `https://react-backend-two.vercel.app/auth/login/reset-password/confirm`,
            { newPassword, code }
         );

         if (response.data.success) {
            message.success('Password reset successful');
            clearForm();
         } else {
            message.error(response.data.message);
         }
      } catch (error: any) {
         console.error('An error occurred:', error.message);
      }
   };

   return (
      <div className='forgot-password-form-container'>
         <Form onFinish={handleSubmit} className='forgot-password-form'>
            <h2 className='header-form'>Reset Password</h2>
            <Form.Item
               label='New Password'
               name='newPassword'
               rules={[
                  {
                     required: true,
                     message: 'Please enter your new password!',
                  },
               ]}
            >
               <InputPassword placeholder='Enter New Password' />
            </Form.Item>
            <Form.Item
               label='Reset Code'
               name='code'
               rules={[
                  { required: true, message: 'Please enter the reset code!' },
               ]}
            >
               <InputText placeholder='Enter Reset Code' />
            </Form.Item>
            <Form.Item>
               <PrimaryButton type='primary' htmlType='submit' label='Submit' />
            </Form.Item>
         </Form>
      </div>
   );
};

export default NewPassword;
