import React from 'react';
import { useDispatch } from 'react-redux';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHiddenAction } from '../../actions/cartAction';

const CartIcon = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleCartHiddenAction());
  };

  return (
    <div className='cart-icon' onClick={handleClick}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>0</span>
    </div>
  );
};

export default CartIcon;
