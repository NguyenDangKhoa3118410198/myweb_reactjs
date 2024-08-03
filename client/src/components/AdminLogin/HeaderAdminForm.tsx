import {
   FacebookOutlined,
   GoogleOutlined,
   TwitterOutlined,
} from '@ant-design/icons';

function HeaderAdminForm() {
   return (
      <div className='base-inform-login'>
         <h1>Sign In</h1>
         <p>Welcome back</p>
         <div className='social-icons'>
            <div className='admin-platform-icon'>
               <FacebookOutlined className='platform-icon' />
            </div>
            <div className='admin-platform-icon'>
               <GoogleOutlined className='platform-icon' />
            </div>
            <div className='admin-platform-icon'>
               <TwitterOutlined className='platform-icon' />
            </div>
         </div>
         <p>or use your email password</p>
      </div>
   );
}

export default HeaderAdminForm;
