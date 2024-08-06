import { LogoutOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { deleteLocalStorage } from 'ulti';

interface FooterSidebarProps {
   darkMode: boolean;
}

const FooterSidebar: React.FC<FooterSidebarProps> = ({ darkMode }) => {
   return (
      <div className={`footer-sidebar ${darkMode ? 'isDark' : ''}`}>
         <Divider />
         <label>
            <Link
               to='/login'
               className='user-menu-item logout'
               onClick={deleteLocalStorage}
            >
               <LogoutOutlined className='icon-sidebar-menu' />
               <span className='name-menu-item'>Logout</span>
            </Link>
         </label>
      </div>
   );
};

export default FooterSidebar;
