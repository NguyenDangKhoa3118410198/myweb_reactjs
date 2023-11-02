import React from 'react';
import './cart.css';
import { FaUser, FaShoppingCart, FaBox, FaHubspot } from 'react-icons/fa';

const Card = ({ title, icon, count, color = 'color1' }) => {
   const cartIcon = {
      Customers: <FaUser />,
      Products: <FaBox />,
      Orders: <FaShoppingCart />,
      Access: <FaHubspot />,
   };
   const selectedCard = cartIcon[title] || null;

   return (
      <div className='cart-container'>
         <div className='cart-left'>
            <div className={`cart-icon ${color}`}>{selectedCard}</div>
         </div>

         <div className='cart-right'>
            <h1 className='cart-title'>{title}</h1>
            <h1 className='cart-count'>$1000</h1>
            <div className='cart-up'>up 10%</div>
         </div>
      </div>
   );
};

export default Card;
