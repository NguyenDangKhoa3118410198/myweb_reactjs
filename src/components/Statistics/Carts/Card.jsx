import React from 'react';
import './cart.css';
import { FaQuestion } from 'react-icons/fa';

const Card = ({ infoCard }) => {
   const {
      title = 'Default title',
      icon = <FaQuestion />,
      color = 'color1',
   } = infoCard;

   console.log('icon' + icon);

   return (
      <div className='cart-container'>
         <div className='cart-left'>
            <div className={`cart-icon ${color}`}>{icon}</div>
         </div>

         <div className='cart-right'>
            <h1 className='cart-title'>{title ? title : ''}</h1>
            <h1 className='cart-count'>$1000</h1>
            <div className='cart-up'>up 10%</div>
         </div>
      </div>
   );
};

export default Card;
