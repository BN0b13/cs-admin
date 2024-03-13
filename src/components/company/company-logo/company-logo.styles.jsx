import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ProductImg = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 20px;
`;


export const DeleteButton = styled.button`
    min-width: ${setMobileView() ? '105px' : '125px'};
    width: auto;
    height: 40px;
    letter-spacing: 0.5px;
    line-height: 40px;
    padding: 0 15px 0 15px;
    font-size: ${setMobileView() ? '10px' : '12px'};
    background-color: red;
    color: white;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    border: 1px solid white;
    border-radius: 1px;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:hover {
    background-color: #fff;
    color: red;
    border: 1px solid red;
    }
`;