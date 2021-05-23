import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';
import Header from './components/header/Header';

import SignInSignUp from './pages/ auth/SignInSignUp';
import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shop/ShopPage';

class App extends React.Component {
  state = {
    currentUser: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    // accessing firebase auth's method for current user state
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: user });

      // to store auth user data in firestore
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // using userRef to check if our database is updated with any new data
        // onSnapShot() returns a snapshot data object
        userRef.onSnapshot(snapShot => {
          // snapShot is a auth user data stored in firestore
          // NOTE - Need to call with .data() to get the actual properties of the snapShot object
          // but not with 'id'. User 'id' is available in snapShot object
          this.setState(
            {
              currentUser: {
                // Putting User data together with user id & other props that we want
                id: snapShot.id,
                ...snapShot.data(),
              },
            },
            () => {
              // since setState is async
              console.log(this.state);
            }
          );
        });
      } else {
        // if User signs out, set to null
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      // passing in auth user state in Header component
      // so that it has access to to Auth User state
      <div className='App'>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
