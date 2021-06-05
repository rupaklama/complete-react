import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

import { auth } from '../../firebase/firebase.utils';

// special syntax in React for importing SVG
// tells Create React App that you want a React component that renders an SVG, rather than its filename
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { useSelector } from 'react-redux';

import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCardHidden } from '../../redux/cart/cart.selectors';

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const hidden = useSelector(selectCardHidden);

  return (
    <div className='header'>
      <Link to='/' className='logo-container'>
        <Logo className='logo' />
      </Link>

      <div className='options'>
        <Link to='/shop' className='option'>
          SHOP
        </Link>
        <Link to='/shop' className='option'>
          CONTACT
        </Link>

        {currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className='option' to='/signin'>
            SIGN IN
          </Link>
        )}

        <CartIcon />
      </div>

      {/* if hidden is true render nothing else <CartDropdown /> */}
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

export default Header;
