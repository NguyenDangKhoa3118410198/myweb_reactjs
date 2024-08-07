import React from 'react';
interface IDarkMode {
   darkMode: boolean;
   setDarkMode: (value: boolean) => void;
}

const Darkmode: React.FC<IDarkMode> = ({ darkMode, setDarkMode }) => {
   return (
      <div className='header-theme-toggle'>
         <label className='switch'>
            <input
               type='checkbox'
               onClick={() => {
                  setDarkMode(!darkMode);
               }}
            />
            <span className='slider round'></span>
         </label>
         <span className='theme-title'>Darkmode Header</span>
      </div>
   );
};

export default Darkmode;
