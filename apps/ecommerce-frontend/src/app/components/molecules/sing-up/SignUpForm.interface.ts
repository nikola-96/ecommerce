export interface SignUpFormI {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpFormPropsI {
  onSubmit: (data: SignUpFormI) => void;
}
