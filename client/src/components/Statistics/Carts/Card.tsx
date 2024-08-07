import React from 'react';
import './cart.css';
import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import IconArrowUp from '../../../imgs/IconArrowUp.svg';

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
         <div className='cart-left'>
            <h1 className='cart-title'>{title ? title : ''}</h1>
            <h1 className='cart-count'>{data ?? '...Loading'}</h1>
            <div className='cart-up'>
               <img src={IconArrowUp} alt='Error' />
               <span className='cart-up-highlight'>10% Up</span> from yesterday
            </div>
         </div>
         <div className='cart-right'>
            <div className={`cart-icon `}>
               <img className='cart-img' src={icon} alt='Error' />
            </div>
         </div>
      </Link>
   );
};

export default Card;
