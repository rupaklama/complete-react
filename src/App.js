import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUserAction } from './actions/userAction';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';
import Header from './components/header/Header';

import SignInSignUp from './pages/ auth/SignInSignUp';
import Homepage from './pages/homepage/Homepage';
import ShopPage from './pages/shop/ShopPage';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // action creator
    const { setCurrentUserAction } = this.props;

    // accessing firebase auth's method for current user state
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log(userAuth);
      // this.setState({ currentUser: user });

      // to store auth user data in firestore
      if (userAuth) {
        // createUserProfileDocument func returns userRef - documentRef
        const userRef = await createUserProfileDocument(userAuth);

        // using userRef to check if our database is updated with any new data
        // onSnapShot() returns a snapshot object representing data store in our firestore
        userRef.onSnapshot(snapShot => {
          // snapShot is a auth user data stored in firestore
          // NOTE - Need to call with .data() to get the actual properties of the snapShot object
          // but not with 'id'. User 'id' is available in snapShot object

          setCurrentUserAction({
            // Putting User data together with user id & other props that we want
            id: snapShot.id,
            // .data() to get the actual properties of the snapShot object like displayName, email etc
            ...snapShot.data(),
          });
        });
      }

      // if User signs out, set to null
      setCurrentUserAction(userAuth);
    });
  }

  // Calling the unsubscribe function when the component is about to unmount is the best way to make sure we don't get any memory leaks in our application related to listeners still being open even if the component that cares about the listener is no longer on the page
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      // passing in auth user state in Header component
      // so that it has access to to Auth User state
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route
            exact
            path='/signin'
            render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInSignUp />)}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  // user auth state reducer
  currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  // setting 'user' param for the action creator
  setCurrentUserAction: user => dispatch(setCurrentUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
