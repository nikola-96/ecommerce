'use client';

import { SignInForm } from '../components/molecules/sign-in/SignInForm';
import { SignInFormI } from '../components/molecules/sign-in/SignInForm.interface';

const LoginPage = () => {
  const onSubmit = (data: SignInFormI) => {
    console.log(data);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default LoginPage;
