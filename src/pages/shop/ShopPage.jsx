import { Component } from 'react';
import CollectionPreview from '../../components/collection-preview/CollectionPreview';

import SHOP_DATA from './shop.data';

class ShopPage extends Component {
  state = {
    collections: SHOP_DATA,
  };

  render() {
    const { collections } = this.state;

    return (
      <div className='shop-page'>
        {collections.map(({ id, title, items }) => (
          <CollectionPreview key={id} title={title} items={items} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
