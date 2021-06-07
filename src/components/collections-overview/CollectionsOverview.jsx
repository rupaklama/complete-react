import React from 'react';
import { useSelector } from 'react-redux';
import { selectShopCollections } from '../../redux/shop/shop.selectors';
import './collections-overview.styles.scss';
import CollectionPreview from '../collection-preview/CollectionPreview';

const CollectionsOverview = () => {
  const collections = useSelector(selectShopCollections);

  return (
    <div className='collections-overview'>
      {collections.map(({ id, title, items }) => (
        <CollectionPreview key={id} title={title} items={items} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
