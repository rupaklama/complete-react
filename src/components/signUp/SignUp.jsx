import React, { useState } from 'react';
import './sign-up.styles.scss';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import FormInput from '../form-input/FormInput';
import Button from '../button/Button';

const SignUp = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { displayName, email, password, confirmPassword } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      // firebase auth method - createUserWithEmailAndPassword
      // Above returns User Auth Object which is on the key - user
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      // to store auth user data in firestore
      await createUserProfileDocument(user, { displayName });
    } catch (err) {
      console.error(err);
    }

    setFormData({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have a account</h2>
      <span>Sign up with your email and password</span>

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          label='Display Name'
          name='displayName'
          value={displayName}
          onChange={handleChange}
        />
        <FormInput type='email' label='Email' name='email' value={email} onChange={handleChange} />
        <FormInput
          type='password'
          label='Password'
          name='password'
          value={password}
          onChange={handleChange}
        />
        <FormInput
          type='password'
          label='Confirm Password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button type='submit'>SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUp;
