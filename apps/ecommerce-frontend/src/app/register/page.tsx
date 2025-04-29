'use client';

import { SignUpForm } from '../components/molecules/sing-up/SignUpForm';
import { SignUpFormI } from '../components/molecules/sing-up/SignUpForm.interface';

const RegisterPage = () => {
  const onSubmit = (data: SignUpFormI) => {
    console.log(data);
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default RegisterPage;
