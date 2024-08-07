import React from 'react';
import './cart.css';
import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ICard {
   infoCard: {
      title: string;
      icon: any;
      path: string;
   };
   data: any;
}

const Card: React.FC<ICard> = ({ infoCard, data }) => {
   const {
      title = 'Default title',
      icon = <FaQuestion />,
      path = '/',
   } = infoCard;

   return (
      <Link to={path} className='cart-container'>
         <div className='cart-right'>
            <h1 className='cart-title'>{title ? title : ''}</h1>
            <h1 className='cart-count'>{data ?? '...Loading'}</h1>
            <div className='cart-up'>10% Up from yesterday</div>
         </div>
         <div className='cart-left'>
            <div className={`cart-icon `}>
               <img src={icon} alt='Error' />
            </div>
         </div>
      </Link>
   );
};

export default Card;
