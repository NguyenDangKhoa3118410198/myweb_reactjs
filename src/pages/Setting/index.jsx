import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Switch from 'components/common/Switch';
import { setSettingCalendar } from 'components/features/setting/settingSlice';
import './setting.css';

function Setting() {
   const dispatch = useDispatch();
   const calendar = useSelector((state) => state.setting.calendar);
   const handleCheckboxChange = () => {
      dispatch(setSettingCalendar(!calendar));
   };

   return (
      <div className='wrapper-profile'>
         <div className='container-profile'>
            <Link to='/home' className='back-to-home-profile'>
               Back
            </Link>
            <div className='infomation-profile'>
               <h1 className='title-profile'>Information</h1>

               <Switch
                  handleFunction={handleCheckboxChange}
                  isChecked={calendar}
               />
            </div>
         </div>
      </div>
   );
}

export default Setting;
