import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
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

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
    }

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
          <Button type='button' onClick={signInWithGoogle} isGoogleSignIn>
            sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

// If you see that your sign in with google button causes the email and password fields to trigger asking the user to fill these in, simply add the property type="button" to our google sign in button! The reason this happens is because any buttons inside of a form element will cause the form to treat the button as type="submit" by default. We don't want that for our google sign in button though, so just make sure to add type="button" to our google sign in CustomButton.
