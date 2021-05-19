import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

// special syntax in React for importing SVG
// tells Create React App that you want a React component that renders an SVG, rather than its filename
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = () => {
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
      </div>
    </div>
  );
};

export default Header;
