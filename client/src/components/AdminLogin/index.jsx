import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, notification } from 'antd';
import axios from 'axios';
import { deleteLocalStorage } from '../../ulti';
import AdminImage from '../../imgs/login.svg';
import './adminLogin.css';
import HeaderAdminForm from './HeaderAdminForm';
import FormAdminLogin from './FormAdminLogin';

const Login = () => {
   const navigate = useNavigate();
   const [rememberMe, setRememberMe] = useState(false);

   const [form] = Form.useForm();

   const handleRememberMeChange = (e) => {
      const isChecked = e.target.checked;
      setRememberMe(isChecked);
      localStorage.setItem('remember', String(isChecked));
   };

   useEffect(() => {
      deleteLocalStorage();
      const savedEmail = localStorage.getItem('email');
      const savedPassword = localStorage.getItem('password');
      const remember = localStorage.getItem('remember');

      if (savedEmail && savedPassword) {
         form.setFieldsValue({
            email: savedEmail,
            password: savedPassword,
         });
         setRememberMe(remember === 'true');
      }
   }, [form]);

   const handleSubmit = async (values) => {
      const { email, password } = values;

      if (rememberMe) {
         localStorage.setItem('email', email);
         localStorage.setItem('password', password);
      } else {
         localStorage.removeItem('email');
         localStorage.removeItem('password');
      }

      try {
         await handleApiCall('login/admin', { email, password });
      } catch (error) {
         console.error(error);
         notification.error({
            message: 'Error',
            description:
               error.response?.data?.message || 'An unexpected error occurred.',
         });
      }

      form.resetFields();
   };

   const handleApiCall = async (apiEndpoint, requestData) => {
      try {
         const response = await axios.post(
            `https://react-backend-two.vercel.app/auth/${apiEndpoint}`,
            requestData
         );
         const data = response.data;

         if (data.success) {
            const {
               accessToken,
               refreshToken,
               customerInfo,
               username,
               message,
            } = data;

            localStorage.setItem('authToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('customerInfo', JSON.stringify(customerInfo));

            navigate('/home');
            notification.success({
               message: 'Success',
               description: message,
            });
         }
      } catch (error) {
         notification.error({
            message: 'Error',
            description:
               error.response?.data?.message || 'An unexpected error occurred.',
         });
      }
   };

   return (
      <div className='wrapper-admin-login'>
         <div className='admin-login-container' id='admin-login-container'>
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
               <Form
                  form={form}
                  onFinish={handleSubmit}
                  initialValues={{ remember: rememberMe }}
                  className='login-form'
               >
                  <HeaderAdminForm />
                  <FormAdminLogin
                     handleRememberMeChange={handleRememberMeChange}
                     rememberMe={rememberMe}
                  />
               </Form>
            </div>
         </div>
      </div>
   );
};

export default Login;
