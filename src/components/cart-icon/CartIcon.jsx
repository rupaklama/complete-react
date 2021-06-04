import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHiddenAction } from '../../redux/cart/cartAction';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

// This is optional
// When the selector does only depend on the state,
// simply ensure that it is declared outside of the component so that
// the same selector instance is used for each render
// const DisplayQuantity = () => {
//   // using reselect selector to display quantity
//   const quantityTotal = useSelector(selectCartItemsCount);
//   return <span className='item-count'>{quantityTotal}</span>;
// };

const CartIcon = () => {
  // console.count('CartIcon');

  // using reselect selector to display quantity
  const quantityTotal = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleCartHiddenAction());
  };

  return (
    <div className='cart-icon' onClick={handleClick}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{quantityTotal}</span>
    </div>
  );
};

export default CartIcon;
