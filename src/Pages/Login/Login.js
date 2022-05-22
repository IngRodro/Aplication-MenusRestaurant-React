import {
  BoxContainer,
  HeaderContainer,
  HeaderText,
  InnerContainer,
  SmallText,
  TopContainer,
  BackDrop,
} from './style';
import { useState } from 'react';
import { AccountContext } from '../../Context/accountContext';
import SignIn from '../../components/Organisms/Sign/SignIn';
import SignUp from '../../components/Organisms/Sign/SignUp';
const backdropVariants = {
  expanded: {
    width: '233%',
    height: '1150px',
    borderRadius: '50%',
    transform: 'rotate(60deg)',
  },
  collapsed: {
    width: '160%',
    height: '550px',
    borderRadius: '50%',
    transform: 'rotate(60deg)',
  },
};

const expandingTransition = {
  type: 'spring',
  duration: 0.8,
  stiffness: 35,
};

const Login = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [signForm, setSignForm] = useState('signIn');

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000);
  };

  const switchToSignUp = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setSignForm('signUp');
    }, 400);
  };

  const switchToSignIn = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setSignForm('signIn');
    }, 400);
  };

  const contextValue = { switchToSignUp, switchToSignIn };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {signForm === 'signIn' && (
            <HeaderContainer>
              <HeaderText>Welcome</HeaderText>
              <HeaderText>Back</HeaderText>
              <SmallText>Please sign-in to continue!</SmallText>
            </HeaderContainer>
          )}
          {signForm === 'signUp' && (
            <HeaderContainer>
              <HeaderText>Create</HeaderText>
              <HeaderText>Account</HeaderText>
              <SmallText>Please sign-up to continue!</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {signForm === 'signIn' && <SignIn />}
          {signForm === 'signUp' && <SignUp />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
};

export default Login;
