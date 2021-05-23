import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from './config';

// initialize our firebase application
firebase.initializeApp(config);

// authentication
export const auth = firebase.auth();

// firestore db
export const firestore = firebase.firestore();

// google O auth
const provider = new firebase.auth.GoogleAuthProvider();
// trigger google pop up
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

// storing auth user data in firestore
// params - auth user & additional data if needed
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if no user, exit
  if (!userAuth) return;

  // query user document inside firestore to see if its already exists
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // snapshot
  const snapshot = await userRef.get();

  // if auth user exists, create user data inside firestore
  if (!snapshot.exists) {
    // destructuring props that we want to store
    const { displayName, email } = userAuth;

    // creating data object for current data and time
    const createdAt = new Date();

    // async request to store auth user data
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData, // additional data if any
      });
    } catch (err) {
      console.error('error creating user', err.message);
    }
  }

  // we can use it to do other things
  return userRef;
};

// incase we want the whole library
export default firebase;
