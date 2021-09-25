// reselect - Redux middleware library for creating memoized selectors
//  will allow us to memoize and not re-render a component if the state value does not change
import { createSelector } from 'reselect';

// there are two types of selectors we can write
// first one is 'input' selector that does not use 'createSelector'
// second type is 'output' Function/Selector  that does use 'input' selectors & 'createSelector'

// naming structure - begins with 'select'
// input selector (simple selector) - a function that gets a whole state & returns slice of state
// note - 'useSelector' is an Input Selector
const selectCart = state => state.cart;

// Reselect is to Memoize all our Selectors
// Reselect allow us to memoize and not re-render a component if the state value does not change
// Since we use createSelector, now its a memoize selector

// This is 'output' Function/Selector that does use 'input' selector from above & 'createSelector'
// cart's hidden memoized state
export const selectCardHidden = createSelector([selectCart], cart => cart.hidden);

// cart items memoized state
export const selectCartItems = createSelector(
  // first arg is a collection/array of 'input' selectors
  // we are going to have more input selectors
  // note - 'input' selectors args can be in an array or separated with commas
  [selectCart],

  // output(...) - new derived / calculated piece of state
  // This is an Output function which will return the value we want out of the selectors above
  // arguments order does matter according to the input selectors
  // note - this is the value whatever the input selector returns
  // cart - {hidden: true, cartItems: [...]}
  cart => cart.cartItems
);

// Composable means we can also add other Reselect Selectors as inputs
// to build a new selector for complex transformation.
// note - adding above Reselect Selector to use its value here
// Reselect selector which returns cart items - Quantity
export const selectCartItemsCount = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((total, item) => total + item.quantity, 0)
);

// cart items total price
export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
);
