import { combineReducers } from 'redux';

// need to persist our reducer as well
import { persistReducer } from 'redux-persist';

// telling redux-persist that we want to use window browser local storage
// as a default Storage
import storage from 'redux-persist/lib/storage';

import cartReducer from './cart/cartReducer';
import directoryReducer from './directory/directoryReducer';
import shopReducer from './shop/shopReducer';
import userReducer from './user/userReducer';

// note - need to define persist config
const persistConfig = {
  // start from root reducer to store everything
  key: 'root',

  // as storage to store
  storage,

  // array containing string names of any reducers that we want to store
  // reducers that we want to persist
  whitelist: ['cart'],
  // note - our user state is handle by firebase
  // don't need to add 'user' reducer here to persist user auth state
};

// calling it a Root Reducer now
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

// modified version of our root reducer to return persisted state with persistReducer func
export default persistReducer(persistConfig, rootReducer);

// note - next step is to update our index.js with Provider
