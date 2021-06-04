import React from 'react';
import './cart-dropdown.styles.scss';
import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartDropdown = () => {
  // console.count('CartDropdown');

  // using reselect selector to access cart items
  const cartItems = useSelector(selectCartItems);

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>

      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
