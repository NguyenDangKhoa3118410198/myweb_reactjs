import { toggleDarkMode } from 'components/features/darkmode/darkModeSlice';
import { useDispatch } from 'react-redux';

interface FooterSidebarProps {
   darkMode: boolean;
}

const FooterSidebar: React.FC<FooterSidebarProps> = ({ darkMode }) => {
   const dispatch = useDispatch();
   return (
      <div className={`footer-sidebar ${darkMode ? 'isDark' : ''}`}>
         <label className='switch'>
            <input
               type='checkbox'
               className={darkMode ? 'isDark' : ''}
               onChange={() => {
                  dispatch(toggleDarkMode());
               }}
            />
            <span className='slider'></span>
         </label>
      </div>
   );
};

export default FooterSidebar;
