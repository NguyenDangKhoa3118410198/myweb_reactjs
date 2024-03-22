import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import './profile.css';
import { getObjectFromLocalStorage } from '../../ulti';

function Profile() {
   const [name, setName] = useState('');
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [oldPassword, setOldPassword] = useState('');
   const [phone, setPhone] = useState('');
   const [address, setAddress] = useState('');

   const [avatarUrl, setAvatarUrl] = useState('');

   useEffect(() => {
      const customerInfo = localStorage.getItem('customerInfo');
      if (customerInfo) {
         const customerObject = JSON.parse(customerInfo);
         setEmail(customerObject.email || '');
         setPassword(customerObject.password || '');
         setName(customerObject.name || '');
         setUsername(customerObject.username || '');
         setAvatarUrl(customerObject.avatar || '');
         setPhone(customerObject.phone || '');
         setAddress(customerObject.address || '');
      }
   }, []);

   const storeImageUrlToLocalStorage = (imageUrl) => {
      const customerInfo = getObjectFromLocalStorage('customerInfo');
      customerInfo.avatar = imageUrl;

      const updatedJsonString = JSON.stringify(customerInfo);
      localStorage.setItem('customerInfo', updatedJsonString);
   };

   const handleChangePassword = () => {
      console.log('Đã thay đổi mật khẩu');
   };

   const handleAvatarChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
         setAvatarUrl(reader.result);
         storeImageUrlToLocalStorage(reader.result);
      };

      if (file) {
         reader.readAsDataURL(file);
      }
   };

   return (
      <div className='wrapper-profile'>
         <div className='container-profile'>
            <Link to='/home' className='back-to-home-profile'>
               Back
            </Link>
            <div className='infomation-profile'>
               <h1 className='title-profile'>Information</h1>
               <div className='avatar-profile-container'>
                  <div className='avatar-image-container'>
                     <img
                        src={avatarUrl}
                        alt='Avatar'
                        className='avatar-image'
                     />
                  </div>
                  <label htmlFor='avatar-input' className='avatar-label'>
                     <FaCamera />
                  </label>
                  <input
                     type='file'
                     id='avatar-input'
                     accept='image/*'
                     onChange={handleAvatarChange}
                     style={{ display: 'none' }}
                  />
               </div>
               <div className='info-text-profile'>
                  <div className='group-items-profile'>
                     <div className='item-profile'>
                        <label>Name</label>
                        <input type='text' value={name} readOnly />
                     </div>

                     <div className='item-profile'>
                        <label>Username</label>
                        <input type='text' value={username} readOnly />
                     </div>
                  </div>

                  <div className='group-items-profile'>
                     <div className='item-profile'>
                        <label>Email</label>
                        <input type='email' value={email} readOnly />
                     </div>
                  </div>

                  <div className='group-items-profile'>
                     <div className='item-profile'>
                        <label>Phone</label>
                        <input type='email' value={phone} readOnly />
                     </div>

                     <div className='item-profile'>
                        <label>Address</label>
                        <input type='text' value={address} readOnly />
                     </div>
                  </div>
                  <div className='group-items-profile'>
                     <div className='item-profile'>
                        <label>Password</label>
                        <input type='password' value='rosecipu' readOnly />
                     </div>
                  </div>
               </div>
            </div>
            <div className='change-pwd-profile'>
               <form>
                  <label className='title-profile' htmlFor='status-profile'>
                     Status
                  </label>
                  <textarea
                     id='status-profile'
                     value='hom nay troi dep the nho'
                     readOnly
                  />
                  <label className='title-profile' htmlFor='old-pwd-proflie'>
                     Change Password
                  </label>
                  <input
                     id='old-pwd-proflie'
                     type='password'
                     placeholder='Enter old password'
                     value={oldPassword}
                     onChange={(e) => setOldPassword(e.target.value)}
                     required
                  />
                  <input
                     type='password'
                     placeholder='Enter new password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
                  <button
                     className='btn-change-pwd-profile'
                     onClick={handleChangePassword}
                  >
                     Submit
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Profile;
