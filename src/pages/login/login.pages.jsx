import React from 'react';

import Login from '../../components/login/login.component';

import {
  ContentContainer,
  MainContainer
} from '../../styles/page.styles';

const LoginPage = () => {

  return (
    <MainContainer>
      <ContentContainer>
        <Login />
      </ContentContainer>
    </MainContainer>
  )
}
  


export default LoginPage;