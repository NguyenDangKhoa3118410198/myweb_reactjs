import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import './profile.css';
import { getObjectFromLocalStorage } from '../../ulti';

const Profile = () => {
   const [name, setName] = useState('');
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [oldPassword, setOldPassword] = useState('');
   const [phone, setPhone] = useState('');
   const [address, setAddress] = useState('');

   const [avatarUrl, setAvatarUrl] = useState<any>('');

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

   const storeImageUrlToLocalStorage = (imageUrl: any) => {
      const customerInfo = getObjectFromLocalStorage('customerInfo');
      customerInfo.avatar = imageUrl;

      const updatedJsonString = JSON.stringify(customerInfo);
      localStorage.setItem('customerInfo', updatedJsonString);
   };

   const handleChangePassword = () => {
      console.log('Đã thay đổi mật khẩu');
   };

   const handleAvatarChange = (event: any) => {
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
               <label className='title-profile' htmlFor='status-profile'>
                  Status
               </label>
               <textarea
                  id='status-profile'
                  value='Nguyễn Thùy Chi (sinh ngày 14 tháng 6 năm 1993), thường được biết đến với nghệ danh Chi Pu, là một nữ ca sĩ, diễn viên, người dẫn chương trình kiêm người mẫu người Việt Nam. Cô được công chúng biết đến sau khi lọt vào Top 20 Miss Teen Việt Nam 2009,[1] và là hotgirl Việt Nam có lượng người theo dõi và quan tâm nhiều nhất trên mạng xã hội vào năm 2015.[2]

                  Ngoài thành công với sự nghiệp làm người mẫu ảnh và diễn viên, cô còn trở thành một ca sĩ vào năm 2017 và từng nhận về những lời chỉ trích từ khán giả và giới chuyên môn trong những năm đầu sự nghiệp ca hát.
                  Tiểu sử
Chi Pu sinh ngày 14 tháng 6 năm 1993 tại Hà Nội. Gia đình gồm bố, mẹ và một chị lớn hơn Chi Pu 11 tuổi.[8] Bố của cô làm trong quân đội, còn mẹ là giáo viên nên từ nhỏ cô đã được bố mẹ giáo dục nghiêm khắc và hướng cô đi theo những giá trị truyền thống của gia đình. Chi Pu biết chơi đàn piano và từng tham dự nhiều cuộc thi âm nhạc lúc nhỏ. Năm 2003, cô từng giành giải nhất trong cuộc thi Liên hoan đàn organ thành phố Hà Nội.[9] Năm 16 tuổi, Chi Pu đăng ký tham dự cuộc thi Miss Teen 2009 và dừng chân ở Top 20. Từ đó, cô bước vào showbiz và trở thành một Diễn viên nổi tiếng.

Bắt đầu nổi tiếng qua việc tham gia Miss Teen, Chi Pu được mời chụp ảnh cho các mẫu quảng cáo quần áo của các shop thời trang teen. Dần dần, cô trở thành cái tên quen thuộc với giới trẻ thông qua danh xưng hotgirl. Chi Pu theo học tại trường Trung học phổ thông Lê Quý Đôn – Đống Đa, Hà Nội. Sau khi tốt nghiệp cấp ba, cô đăng ký vào trường Đại học RMIT và đã học xong khóa dự bị tiếng Anh tại đây. Tuy nhiên sau đó cô đã bảo lưu kết quả học tập để theo đuổi con đường nghệ thuật.'
                  readOnly
               />
               <form>
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
};

export default Profile;
