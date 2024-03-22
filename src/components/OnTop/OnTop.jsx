import React, { useState } from 'react';
import { UilArrowUp } from '@iconscout/react-unicons';
import './ontop.css';

const OnTopButton = () => {
   const [isHidden, setIsHidden] = useState(false);

   const onTop = () => {
      const container = document.getElementById('top');
      if (container) {
         container.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
   };

   const handleClose = () => {
      setIsHidden(true);
   };

   return (
      <div className={`on-top-wrapper ${isHidden ? 'hidden-on-top' : ''}`}>
         <button className='on-top-container' onClick={onTop}>
            <div className='on-top-effect'>
               <UilArrowUp />
            </div>
         </button>
         <div className='on-top-close' onClick={handleClose}>
            X
         </div>
      </div>
   );
};

export default OnTopButton;
