import styled from 'styled-components';

export const HeaderLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  padding: 1em;
`;

export const HeaderNav = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
`;

export const LogoContainer = styled.div`
    height: 100%;
    width: 80px;
    padding: auto;
    text-align: center;
`;

export const LogoContainerMobile = styled.div`
    height: 100%;
    width: 20px;
    padding: auto;
    text-align: center;
`;

export const LogoLink = styled.a`

`;

export const Logo = styled.img`
    height: 100%;
`;

export const NavOptionsDiv = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

export const NavOptions = styled.div`
    
`;

export const NavOptionsMobileDiv = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;