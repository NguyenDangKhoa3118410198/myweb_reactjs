import axios from 'axios';
import { Button, Form, message } from 'antd';
import PrimaryButton from 'components/common/ButtonComponent/ButtonPrimary';
import InputEmail from 'components/common/InputComponent/InputEmail';
import './forgotPassword.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
   const [success, setSuccess] = useState(false);
   const [form] = Form.useForm();
   const navigate = useNavigate();

   const handleSubmit = async (values: any) => {
      const { email } = values;
      try {
         const response = await axios.post(
            `https://react-backend-two.vercel.app/auth/login/reset-password`,
            { email }
         );

         if (response.data.success) {
            setSuccess(true);
            form.resetFields();
            message.info(response.data.message);
         }
      } catch (error: any) {
         message.error(error.response.data.message);
      }
   };

   return (
      <div className='forgot-password-form-container'>
         <Form
            form={form}
            onFinish={handleSubmit}
            className='forgot-password-form'
         >
            {!success ? (
               <>
                  <h2 className='header-form'>Forgot Password</h2>
                  <Form.Item
                     label='Email'
                     name='email'
                     rules={[
                        { required: true, message: 'Please input your email!' },
                        {
                           pattern:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                           message: 'Please enter a valid email!',
                        },
                     ]}
                  >
                     <InputEmail
                        placeholder='Enter Email'
                        className='input-new-password'
                        autoFocus
                     />
                  </Form.Item>
                  <Form.Item>
                     <PrimaryButton
                        type='primary'
                        htmlType='submit'
                        label='Submit'
                     />
                  </Form.Item>
               </>
            ) : (
               <>
                  <h2 className='header-form'>Password Reset</h2>
                  <p>
                     Your password has been successfully reset. click confirm to
                     set a new password
                  </p>
                  <Button onClick={() => navigate('/new-password')}>
                     Confirm
                  </Button>
               </>
            )}
         </Form>
      </div>
   );
};

export default ForgotPasswordForm;
