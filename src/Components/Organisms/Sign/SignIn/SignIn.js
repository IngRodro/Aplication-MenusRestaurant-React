import React, { useContext } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from '../style';
import Input from '../../../Atoms/Input';
import { AccountContext } from '../../../../Context/accountContext';

const SignInForm = (props) => {
  const { switchToSignUp } = useContext(AccountContext);

  return (
    <BoxContainer $padding={70}>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <SubmitButton type="submit">SignIn</SubmitButton>
      <MutedLink href="#">
        Don't have an account?{' '}
        <BoldLink href="#" onClick={switchToSignUp}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default SignInForm;
