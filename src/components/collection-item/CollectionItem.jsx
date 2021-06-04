import React from 'react';
import './collection-item.styles.scss';
import Button from '../button/Button';
import { useDispatch } from 'react-redux';
import { addItemAction } from '../../redux/cart/cartAction';

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addItemAction(item));
  };

  return (
    <div className='collection-item'>
      <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />

      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>

      <Button inverted onClick={handleClick}>
        Add to cart
      </Button>
    </div>
  );
};

export default CollectionItem;
