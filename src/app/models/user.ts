export type User = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

export type signUpParams = {
  name: string;
  email: string;
  password: string;
  checkout?: boolean,
  dialogId: string
};

export type signInParams = Omit<signUpParams, 'name'>;
