import Swal from 'sweetalert2';
import React, { useContext, useState } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from '../style';
import Input from 'components/Atoms/Input';
import useAuth from 'hooks/useAuth';
import { SignContext } from 'Context/signContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const { checkAuth, saveAuth } = useAuth();
  const navigate = useNavigate();
  const { ChangeSignForm } = useContext(SignContext);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const onChangeUserName = (e) => {
    setUsername(e.target.value);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkAuth().isAuthenticated) {
      await Swal.fire({
        title: 'You are already logged in',
        text: 'Please logout first',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } else {
      if (Username === '' || Password === '') {
        await Swal.fire({
          title: 'Error',
          text: 'Please fill all the fields',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      } else {
        axios
          .post('http://localhost:8080/v1/users/login/', {
            headers: {
              'Content-Type': 'application/json',
            },
            username: Username,
            password: Password,
          })
          .then(
            async (response) => {
              Toast.fire({
                icon: 'success',
                title: 'Login Successful',
                position: 'bottom-end',
              });
              saveAuth(response.headers['auth-token']);
              navigate('/restaurants', { replace: true });
            },
            async (error) => {
              await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username or Password is incorrect!',
              });
            }
          );
      }
    }
  };
  return (
    <BoxContainer $padding={70}>
      <FormContainer onSubmit={handleSubmit}>
        <Input type="text" placeholder="Username" onChange={onChangeUserName} />
        <Input
          type="password"
          placeholder="Password"
          onChange={onChangePassword}
        />
        <SubmitButton type="submit">SignIn</SubmitButton>
      </FormContainer>

      <MutedLink href="#">
        Don't have an account?{' '}
        <BoldLink href="#" onClick={ChangeSignForm}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};

export default SignInForm;
