// first arg is the existing Items in our cart
// second arg is the new cart item to add
export const addItemToCart = (cartItems, cartItemToAdd) => {
  // check to see if the current item is existing cart item to be removed
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

  // add into quantity state & increase its count
  // if that item doesn't match, no need to update quantity state & return current cart item array
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      // creating new object where we have the SAME Cart item
      // except the quantity will be added
      cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }

  // if cart item is not found inside of our array
  // we want to return a new array with all of our existing items already there
  // and also we want to add New Cart item with New 'quantity' Prop set to 1
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

// to remove item
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  // check to see if the current item is existing cart item to be removed
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  // if existingCartItem's quantity is 1, on click remove it
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  // otherwise decrease the quantity
  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? // update the quantity state
        { ...cartItem, quantity: cartItem.quantity - 1 }
      : // otherwise keep other cartItem exact same as they don't need to modified
        cartItem
  );
};
