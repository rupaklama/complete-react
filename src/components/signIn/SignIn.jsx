import React, { useState } from 'react';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import './signIn.style.scss';

import FormInput from '../form-input/FormInput';
import Button from '../button/Button';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // destructuring props
  const { email, password } = formData;

  // name attrib is to refer to the Input element
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    console.log(email, password);

    setFormData({ email: '', password: '' });
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={onSubmit}>
        <FormInput type='email' name='email' value={email} label='email' onChange={onChange} required />

        <FormInput
          type='password'
          name='password'
          value={password}
          label='password'
          minLength='6'
          onChange={onChange}
          required
        />

        <div className='buttons'>
          <Button type='submit'>sign in</Button>
          <Button onClick={signInWithGoogle} isGoogleSignIn>
            sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
