import React from 'react';
import './cart.css';
import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = ({ infoCard, data }) => {
   const {
      title = 'Default title',
      icon = <FaQuestion />,
      color = 'color1',
      path = '/',
   } = infoCard;

   return (
      <Link to={path} className='cart-container'>
         <div className='cart-left'>
            <div className={`cart-icon ${color}`}>{icon}</div>
         </div>

         <div className='cart-right'>
            <h1 className='cart-title'>{title ? title : ''}</h1>
            <h1 className='cart-count'>{data ?? '...Loading'}</h1>
            <div className='cart-up'>up 10%</div>
         </div>
      </Link>
   );
};

export default Card;
