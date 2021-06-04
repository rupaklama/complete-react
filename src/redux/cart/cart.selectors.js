import { createSelector } from 'reselect';

// there are two types of selectors we can write
// first one is 'input' selector that does not use 'createSelector'
// second type is 'output' Function/Selector  that does use 'input' selectors & 'createSelector'

// naming structure - begins with 'select'
// input selector (simple selector) - a function that gets a whole state & returns slice of state
const selectCart = state => state.cart;

// Reselect is to memoize Selectors value - state
// Reselect allow us to memoize and not re-render a component if the state value does not change
// Since we use createSelector, now its a memoize selector

export const selectCartItems = createSelector(
  // first arg is a collection/array of 'input' selectors
  // we are going to have more input selectors
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
