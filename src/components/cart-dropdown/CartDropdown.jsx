import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { useHistory } from 'react-router-dom';

import './cart-dropdown.styles.scss';

import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';
import { toggleCartHiddenAction } from '../../redux/cart/cartAction';

const CartDropdown = () => {
  // console.count('CartDropdown');

  // using reselect selector to access cart items
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleClick = () => {
    history.push('/checkout');
    dispatch(toggleCartHiddenAction());
  };

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>

      <Button onClick={handleClick}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
