import { useNavigate } from 'react-router-dom';

import { Form, Checkbox, Button } from 'antd';
import InputEmail from 'components/common/InputComponent/InputEmail';
import InputPassword from 'components/common/InputComponent/InputPassword';

interface IFormAdminLogin {
   handleRememberMeChange: any;
   rememberMe: boolean;
}

const FormAdminLogin: React.FC<IFormAdminLogin> = ({
   handleRememberMeChange,
   rememberMe,
}) => {
   const navigate = useNavigate();

   const navigateToForgotPassword = () => {
      navigate('/forgot-password');
   };
   return (
      <>
         <div style={{ width: '100%' }}>
            <Form.Item
               name='email'
               rules={[
                  {
                     required: true,
                     message: 'Please input your email!',
                  },
               ]}
            >
               <InputEmail placeholder='Enter your email' autoFocus />
            </Form.Item>

            <Form.Item
               name='password'
               rules={[
                  {
                     required: true,
                     message: 'Please input your password!',
                  },
               ]}
            >
               <InputPassword placeholder='Enter your password' />
            </Form.Item>

            <Form.Item>
               <div className='sub-feature-login'>
                  <Checkbox
                     checked={rememberMe}
                     onChange={handleRememberMeChange}
                  >
                     Remember me
                  </Checkbox>
                  <span
                     onClick={navigateToForgotPassword}
                     className='forgot-password'
                  >
                     Forgot Your Password?
                  </span>
               </div>
            </Form.Item>
         </div>

         <Form.Item>
            <Button type='primary' htmlType='submit' className='btn-sign-in'>
               Sign In
            </Button>
         </Form.Item>
      </>
   );
};

export default FormAdminLogin;
