import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './profile.css';

function Profile() {
   const [name, setName] = useState('John Doe');
   const [username, setUsername] = useState('johndoe');
   const [email, setEmail] = useState('johndoe@example.com');
   const [password, setPassword] = useState('');
   const [avatarUrl, setAvatarUrl] = useState(
      'https://cdn.tuoitre.vn/471584752817336320/2023/1/6/screenshot-2023-01-06-152423-16729934769782082638601.png'
   );

   const handleChangePassword = () => {
      console.log('Đã thay đổi mật khẩu');
   };

   const handleAvatarChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
         setAvatarUrl(reader.result);
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
               <h2 className='title-profile'>Thông tin người dùng</h2>
               <div className='avatar-profile-container'>
                  <div className='avatar-image-container'>
                     <img
                        src={avatarUrl}
                        alt='Avatar'
                        className='avatar-image'
                     />
                  </div>
                  <label htmlFor='avatar-input' className='avatar-label'>
                     Chọn ảnh
                  </label>
                  <input
                     type='file'
                     id='avatar-input'
                     accept='image/*'
                     onChange={handleAvatarChange}
                     style={{ display: 'none' }}
                  />
               </div>
               <div className='info-text-proflie'>
                  <p className='info-basic'>
                     <strong>Name:</strong> {name}
                  </p>
                  <p className='info-basic'>
                     <strong>Username:</strong> {username}
                  </p>
                  <p className='info-basic'>
                     <strong>Email:</strong> {email}
                  </p>
                  <p className='info-basic'>
                     <strong>Address:</strong> {email}
                  </p>
                  <p className='info-basic'>
                     <strong>Birthday:</strong> {email}
                  </p>
               </div>
            </div>
            <div className='change-pwd-profile'>
               <h2 className='title-profile'>Chỉnh sửa mật khẩu</h2>
               <form>
                  <input
                     type='password'
                     placeholder='Nhập mật khẩu mới'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                     className='btn-change-pwd-profile'
                     onClick={handleChangePassword}
                  >
                     Thay đổi mật khẩu
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Profile;
