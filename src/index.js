import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// new component
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// note - need to wrap our app inside of this PersistGate
// passing 'persister' inside of our redux store
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// All Initial Redux Actions get fired to persist data - check redux dev tools
// NOTE - type(pin):"persist/PERSIST" is from persist library
// Initially it checks if anything exists or not in our redux store

// type(pin):"persist/REHYDRATE"
// If anything is in the redux store, this new action will get fired
// to rehydrate any state in redux store to persist data

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
