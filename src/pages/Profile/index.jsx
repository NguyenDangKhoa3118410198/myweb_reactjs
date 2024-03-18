import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import './profile.css';

function Profile() {
   const [name, setName] = useState('John Doe');
   const [username, setUsername] = useState('johndoe');
   const [email, setEmail] = useState('johndoe@example.com');
   const [password, setPassword] = useState('');
   const [oldPassword, setOldPassword] = useState('');

   const [avatarUrl, setAvatarUrl] = useState('');

   useEffect(() => {
      const avatar = localStorage.getItem('avatarUrl');
      setAvatarUrl(avatar);
   }, []);

   const storeImageUrlToLocalStorage = (imageUrl) => {
      localStorage.setItem('avatarUrl', imageUrl);
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
                        <input type='text' value='ChiPu' readOnly />
                     </div>

                     <div className='item-profile'>
                        <label>Username</label>
                        <input type='text' value='Đóa hoa hồng' readOnly />
                     </div>
                  </div>

                  <div className='group-items-profile'>
                     <div className='item-profile'>
                        <label>Email</label>
                        <input
                           type='email'
                           value='roseCipu@gmail.com'
                           readOnly
                        />
                     </div>
                  </div>

                  <div className='group-items-profile'>
                     <div className='item-profile'>
                        <label>Phone</label>
                        <input type='email' value='0251452658' readOnly />
                     </div>

                     <div className='item-profile'>
                        <label>Address</label>
                        <input type='text' value='HCM city' readOnly />
                     </div>
                  </div>
                  <div className='group-items-profile'>
                     <div className='item-profile'>
                        <label>Password</label>
                        <input type='text' value='rosecipu' readOnly />
                     </div>
                  </div>
               </div>
            </div>
            <div className='change-pwd-profile'>
               <h2 className='title-profile'>Change Password</h2>
               <form>
                  <input
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
