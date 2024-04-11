import React, { useState, useEffect } from 'react';
import { UilArrowUp } from '@iconscout/react-unicons';
import './ontop.css';

const OnTopButton = () => {
   const [isHidden, setIsHidden] = useState(true);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 400) {
            setIsHidden(false);
         } else {
            setIsHidden(true);
         }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   const onTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
