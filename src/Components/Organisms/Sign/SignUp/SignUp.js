import React, { useContext } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from '../style';
import Input from '../../../../components/Atoms/Input';
import { AccountContext } from '../../../../Context/accountContext';

const SignInForm = () => {
  const { switchToSignIn } = useContext(AccountContext);

  return (
    <BoxContainer $padding={20}>
      <FormContainer>
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <SubmitButton type="submit">Signup</SubmitButton>
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignIn}>
          SignIn
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default SignInForm;
