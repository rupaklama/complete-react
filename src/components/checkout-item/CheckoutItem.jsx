import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemAction, clearItemAction, removeItemAction } from '../../redux/cart/cartAction';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const dispatch = useDispatch();

  const handleClick = () => dispatch(clearItemAction(cartItem));
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>

      <span className='quantity'>
        <div className='arrow' onClick={() => dispatch(removeItemAction(cartItem))}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => dispatch(addItemAction(cartItem))}>
          &#10095;
        </div>
      </span>

      <span className='price'>{price}</span>

      <div className='remove-button' onClick={handleClick}>
        {/* utf-8 wingding */}&#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
