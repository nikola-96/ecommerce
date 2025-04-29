export interface SignInFormI {
  email: string;
  password: string;
}

export interface SignInFormPropsI {
  onSubmit: (data: SignInFormI) => void;
}
