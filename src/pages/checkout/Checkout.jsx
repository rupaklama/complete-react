import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import './checkout.styles.scss';

import CheckoutItem from '../../components/checkout-item/CheckoutItem';

const Checkout = () => {
  const cartTotal = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);

  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-blog'>
          <span>Product</span>
        </div>
        <div className='header-blog'>
          <span>Description</span>
        </div>
        <div className='header-blog'>
          <span>Quantity</span>
        </div>
        <div className='header-blog'>
          <span>Price</span>
        </div>
        <div className='header-blog'>
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map(item => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      <div className='total'>
        <span>TOTAL: ${cartTotal}</span>
      </div>
    </div>
  );
};

export default Checkout;
