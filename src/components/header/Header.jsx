import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.jsx';

import { auth } from '../../firebase/firebase.utils';

// special syntax in React for importing SVG
// tells Create React App that you want a React component that renders an SVG, rather than its filename
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { useSelector } from 'react-redux';

import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCardHidden } from '../../redux/cart/cart.selectors';
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from './header.styles.jsx';

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const hidden = useSelector(selectCardHidden);

  return (
    <HeaderContainer>
      <LogoContainer to='/' className='logo-container'>
        <Logo className='logo' />
      </LogoContainer>

      <OptionsContainer>
        <OptionLink to='/shop' className='option'>
          SHOP
        </OptionLink>
        <OptionLink to='/shop' className='option'>
          CONTACT
        </OptionLink>

        {currentUser ? (
          <OptionLink as='div' onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to='/signin'>SIGN IN</OptionLink>
        )}

        <CartIcon />
      </OptionsContainer>

      {/* if hidden is true render nothing else <CartDropdown /> */}
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

export default Header;
