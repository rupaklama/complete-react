import React from 'react';
import './collection-item.styles.scss';
import Button from '../button/Button';

const CollectionItem = ({ name, price, imageUrl }) => {
  return (
    <div className='collection-item'>
      <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />

      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>

      <Button inverted>Add to cart</Button>
    </div>
  );
};

export default CollectionItem;
