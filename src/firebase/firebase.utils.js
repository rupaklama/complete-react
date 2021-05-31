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
  // now userRef is documentRef Object on which can perform CRUD methods
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // snapshot is data after calling get/retrieve method of documentRef Object
  const snapshot = await userRef.get();

  // NOTE- documentSnapshot object allows us to check if a document exists
  // at this query using the .exists property which returns a boolean

  // if user data does not exists, create user data inside firestore
  if (!snapshot.exists) {
    // destructuring props that we want to store
    const { displayName, email } = userAuth;

    // creating data object for current data and time
    const createdAt = new Date();

    // async request to store auth user data
    try {
      // set method of documentRef to create object/data
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

  // NOTE - above code will store User in firestore
  // Now, we want to return that documentRef object - userRef so that
  // we can use it to do other things in App.js for example
  return userRef;
};

// incase we want the whole library
export default firebase;
