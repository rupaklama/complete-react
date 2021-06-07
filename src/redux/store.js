import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const middleware = [thunk];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

// it calls redux persistStore with our app store
// creating persisted version of our store with persister object -  persistStore(store)
export const persistor = persistStore(store);

// note - next step is to update our Root reducer
