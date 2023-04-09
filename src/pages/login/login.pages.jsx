import React from 'react';

import LoginForm from '../../components/login-form/login-form.component';

import {
  LoginPageContainer
} from './login.styles';

const LoginPage = () => {

  return (
    <LoginPageContainer>
      <LoginForm />
    </LoginPageContainer>
  )
}
  


export default LoginPage;