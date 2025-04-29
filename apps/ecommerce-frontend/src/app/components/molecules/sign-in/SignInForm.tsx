'use client';

import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { FC } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormTextInput } from '../../atoms/inputs/form-text-input/FormTextInput';
import { SignInFormPropsI } from './SignInForm.interface';

export const SignInForm: FC<SignInFormPropsI> = ({ onSubmit }) => {
  const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  });

  type SignInFormData = z.infer<typeof loginSchema>;
  const methods = useForm<SignInFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const { register, handleSubmit } = methods;

  const submitForm = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <FormProvider {...methods}>
          <form onSubmit={submitForm}>
            <FormTextInput
              {...register('email')}
              name="email"
              type="text"
              label="E-mail"
              labelclassname="block text-sm font-medium text-gray-700"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <FormTextInput
              {...register('password')}
              name="password"
              type="password"
              label="Password"
              labelclassname="block text-sm font-medium text-gray-700"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </FormProvider>
        <p className="mt-6 text-sm text-center text-gray-400">
          Need an account?
          <Link
            href="/register"
            className="text-indigo-500 hover:text-indigo-600"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};
