import { Component, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUserAction } from './redux/user/userAction';

import ErrorBoundary from './components/error-boundary/ErrorBoundary';

// styled component global styles
import { GlobalStyle } from './global.styles';

import Header from './components/header/Header';

// import Homepage from './pages/homepage/Homepage';
// import ShopPage from './pages/shop/ShopPage';
// import Checkout from './pages/checkout/Checkout';
// import moduleName from './pages/ auth/SignInSignUp'

const HomePage = lazy(() => import('./pages/homepage/Homepage'));
const ShopPage = lazy(() => import('./pages/shop/ShopPage'));
const Checkout = lazy(() => import('./pages/checkout/Checkout'));
const SignInSignUp = lazy(() => import('./pages/ auth/SignInSignUp'));

class App extends Component {
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
        <GlobalStyle />
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<div>...Loading</div>}>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/shop' component={ShopPage} />

              <Route exact path='/checkout' component={Checkout} />
              <Route
                exact
                path='/signin'
                render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInSignUp />)}
              />
            </Suspense>
          </ErrorBoundary>
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
