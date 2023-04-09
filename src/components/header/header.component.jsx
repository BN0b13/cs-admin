import React from 'react';

import {
  HeaderLink,
  HeaderNav,
  Logo,
  LogoContainer,
  LogoLink,
  NavOptionsDiv,
  NavOptionsMobileDiv,
} from './header.styles';

import { tokenName } from '../../config';
import text from '../../assets/img/text.png';
import textMobile from '../../assets/img/textMobile.png';

const logInOptions = (token) => {
  if(token) {
    return (
      <HeaderLink onClick={() => {
        localStorage.removeItem(tokenName);
        sessionStorage.removeItem(tokenName);
        window.location = '/';
      }}>
        Log Out
      </HeaderLink>
    );
  }

  return (
    <HeaderLink href={`/login`}>
      Log In
    </HeaderLink>
  );
}


const Header = (token) => {
  if(window.screen.width < 500) {
    return (
      <HeaderNav>
        <LogoContainer>
          {<LogoLink onClick={() => window.location = '/'} >
            {<Logo src={textMobile} />}
          </LogoLink>}
        </LogoContainer>
        <NavOptionsMobileDiv>
          { logInOptions(token) }
        </NavOptionsMobileDiv>
      </HeaderNav>
    );
  }

  return (
    <HeaderNav>
      <LogoContainer>
        {<LogoLink onClick={() => window.location = '/'} >
          {<Logo src={text} />}
        </LogoLink>}
      </LogoContainer>
      <NavOptionsDiv>
        { logInOptions(token) }
      </NavOptionsDiv>
    </HeaderNav>
  );
};

export default Header;