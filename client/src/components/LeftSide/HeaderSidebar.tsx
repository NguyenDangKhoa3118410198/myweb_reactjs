import { Link } from 'react-router-dom';
import Logo from '../../imgs/logo-react.svg';

interface HeaderSidebarProps {
   darkMode: boolean;
}

const HeaderSidebar: React.FC<HeaderSidebarProps> = ({ darkMode }) => {
   return (
      <header className={`header-sidebar ${darkMode ? 'isDark' : ''}`}>
         <Link to='/' className='header-sidebar-container'>
            <div className='brand'>
               <img src={Logo} alt='logo' className='header-sidebar-logo' />
            </div>
            <div className={`logo ${darkMode ? 'darkmode' : ''}`}>
               <span>KOSS</span>
            </div>
         </Link>
      </header>
   );
};

export default HeaderSidebar;
