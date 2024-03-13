import { useContext } from 'react';
import { slide as Menu } from 'react-burger-menu';

import { 
    GrLogin, 
    GrLogout 
} from 'react-icons/gr';

import Spinner from '../../reusable/spinner/spinner.component';

import navLogoMobile from '../../../assets/img/text.png';

import { menuItemsAdmin, menuItemsContributor } from '../../../assets/menu-items';
import { tokenName } from '../../../config';

import { UserContext } from '../../../contexts/user.context';

import './hamburger-menu.css';

import {
    HeaderLink,
    MobileDropDownMenu,
    MobileDropDownMenuItem,
    MobileDropDownMenuLastItem,
    MobileDropDownMenuLink,
    Logo,
    LogoContainer,
    LogoLink,
} from './hamburger-menu.styles';

const HamburgerMenu = props => {
    const loggedInStatus = localStorage.getItem(tokenName);

    const { currentUser } = useContext(UserContext);

    return (
        <Menu>
            <MobileDropDownMenu>
                <LogoContainer>
                    <LogoLink onClick={() => window.location = '/'} >
                        <Logo src={navLogoMobile} />
                    </LogoLink>
                </LogoContainer>
            {loggedInStatus ? 
                <>
                    {currentUser === null ?
                        <Spinner />
                    :
                        <>
                            {currentUser.roleId < 3 &&
                                menuItemsAdmin.map((item, index) => {
                                    return (
                                        <MobileDropDownMenuItem key={index}>
                                                { item.icon }
                                            <MobileDropDownMenuLink href={item.path}>
                                                { item.title }
                                            </MobileDropDownMenuLink>
                                        </MobileDropDownMenuItem>
                                    );
                                })
                            }
                            {currentUser.roleId === 5 &&
                                menuItemsContributor.map((item, index) => {
                                    return (
                                        <MobileDropDownMenuItem key={index}>
                                                { item.icon }
                                            <MobileDropDownMenuLink href={item.path}>
                                                { item.title }
                                            </MobileDropDownMenuLink>
                                        </MobileDropDownMenuItem>
                                    );
                                })
                            }
                        </>
                    }
                    <MobileDropDownMenuLastItem>
                        <style>
                            {`
                                svg path {
                                stroke: white
                                }
                            `}
                        </style>
                        <GrLogout color="white" />
                        <HeaderLink 
                            onClick={() => {
                            localStorage.removeItem(tokenName);
                            sessionStorage.removeItem(tokenName);
                            window.location = '/';
                            }}
                        >
                            Log Out
                        </HeaderLink>
                    </MobileDropDownMenuLastItem>
                </>
            :
            <MobileDropDownMenuLastItem>
                <style>
                    {`
                        svg path {
                        stroke: white
                        }
                    `}
                </style>
                <GrLogin color="white" />
                <HeaderLink href={`/login`}>
                    Log In
                </HeaderLink>
            </MobileDropDownMenuLastItem>
            }
            
            </MobileDropDownMenu>
        </Menu>
    
    );
  }

  export default HamburgerMenu;