import { useEffect, useState } from 'react';
import { Form, Avatar, Upload, Button } from 'antd';
import { UserOutlined, CameraOutlined } from '@ant-design/icons';
import './profile.css';
import { getObjectFromLocalStorage } from '../../ulti';
import InputText from 'components/common/InputComponent/InputText';
import InputEmail from 'components/common/InputComponent/InputEmail';
import InputPassword from 'components/common/InputComponent/InputPassword';

const Profile = () => {
   const [name, setName] = useState('');
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [address, setAddress] = useState('');
   const [avatarUrl, setAvatarUrl] = useState<any>('');

   useEffect(() => {
      const customerInfo = localStorage.getItem('customerInfo');
      if (customerInfo) {
         const customerObject = JSON.parse(customerInfo);
         setEmail(customerObject.email || '');
         setName(customerObject.name || '');
         setUsername(customerObject.username || '');
         setAvatarUrl(customerObject.avatar || '');
         setPhone(customerObject.phone || '');
         setAddress(customerObject.address || '');
      }
   }, []);

   const storeImageUrlToLocalStorage = (imageUrl: any) => {
      const customerInfo = getObjectFromLocalStorage('customerInfo');
      customerInfo.avatar = imageUrl;

      const updatedJsonString = JSON.stringify(customerInfo);
      localStorage.setItem('customerInfo', updatedJsonString);
   };
   const handleAvatarChange = (info: any) => {
      const file =
         info.file?.originFileObj ||
         info.file ||
         info.fileList?.[0]?.originFileObj;
      console.log('Selected file:', file);

      if (file) {
         const imageUrl = URL.createObjectURL(file);
         setAvatarUrl(imageUrl);
         storeImageUrlToLocalStorage(imageUrl);
      } else {
         console.error('No file selected or file structure is incorrect.');
      }
   };

   return (
      <div className='wrapper-profile'>
         <h1 className='title-profile'>Information</h1>
         <div className='avatar-profile-container'>
            <Avatar
               size={128}
               src={avatarUrl}
               icon={!avatarUrl && <UserOutlined />}
            />
            <Upload
               showUploadList={false}
               onChange={handleAvatarChange}
               beforeUpload={() => false} // Ngăn upload tự động
               accept='image/*'
            >
               <Button icon={<CameraOutlined />} style={{ marginTop: '16px' }}>
                  Change Avatar
               </Button>
            </Upload>
         </div>
         <div className='profile-form-wrapper'>
            <Form layout='vertical' className='info-text-profile'>
               <Form.Item label='Name'>
                  <InputText value={name} readOnly />
               </Form.Item>

               <Form.Item label='Username'>
                  <InputText value={username} readOnly />
               </Form.Item>

               <Form.Item label='Email'>
                  <InputEmail value={email} readOnly />
               </Form.Item>

               <Form.Item label='Phone'>
                  <InputText value={phone} readOnly />
               </Form.Item>

               <Form.Item label='Address'>
                  <InputText value={address} readOnly />
               </Form.Item>

               <Form.Item label='Password'>
                  <InputPassword value='rosecipu' readOnly />
               </Form.Item>
            </Form>
         </div>
      </div>
   );
};

export default Profile;
