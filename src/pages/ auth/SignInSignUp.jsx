import React from 'react';
import SignIn from '../../components/signIn/SignIn';
import './signInSignUp.style.scss';
import SignUp from '../../components/signUp/SignUp';

const SignInSignUp = () => {
  return (
    <div className='sign-in-and-sign-up'>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInSignUp;
