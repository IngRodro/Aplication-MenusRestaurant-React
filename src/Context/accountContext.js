import { createContext } from 'react';

export const AccountContext = createContext({
  switchtoSignIn: () => {},
  switchtoSignUp: () => {},
});
