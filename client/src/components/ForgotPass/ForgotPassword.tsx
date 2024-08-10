import axios from 'axios';
import { Form, message } from 'antd';
import PrimaryButton from 'components/common/ButtonComponent/ButtonPrimary';
import InputEmail from 'components/common/InputComponent/InputEmail';
import './forgotPassword.css';

const ForgotPasswordForm = () => {
   const handleSubmit = async (values: any) => {
      const { email } = values;
      try {
         const response = await axios.post(
            `https://react-backend-two.vercel.app/auth/login/reset-password`,
            { email }
         );

         if (response.data.success) {
            message.info(response.data.message);
         }
      } catch (error: any) {
         message.error(error.response.data.message);
      }
   };

   return (
      <div className='forgot-password-form-container'>
         <Form onFinish={handleSubmit} className='forgot-password-form'>
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
               <InputEmail placeholder='Enter Email' />
            </Form.Item>
            <Form.Item>
               <PrimaryButton type='primary' htmlType='submit' label='Submit' />
            </Form.Item>
         </Form>
      </div>
   );
};

export default ForgotPasswordForm;
