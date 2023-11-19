import React from 'react';
import { UilArrowUp } from '@iconscout/react-unicons';
import './ontop.css';

const OnTopButton = () => {
   const onTop = () => {
      const container = document.getElementById('top');
      if (container) {
         container.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
   };

   return (
      <button className='on-top-container' onClick={onTop}>
         <UilArrowUp />
      </button>
   );
};

export default OnTopButton;
