import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const AccountDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const AccountDetailsTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 30px;
`;

export const TextRowContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const AccountEditContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const AccountDetailsTitle = styled.h2`
    text-align: center;
    
`;

export const AccountDetailsSubtitle = styled.h4`
    margin: 10px 5px;
`;

export const UpdatePasswordLink = styled.h4`
    margin: 30px 5px;
    cursor: pointer;
`;

export const AccountDetailsInlineTitle = styled.h4`
    margin: 5px;
`;

export const AccountDetailsText = styled.p`
    margin: 5px;
`;

export const AccountAddressContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`;

export const AddressContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const UpdateButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const AccountDetailsInput = styled.input`
    width: 300px;
    margin: 5px 0;
    padding: 3px;
`;

export const AddressBottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
`;

export const DeleteButton = styled.button`
    margin-bottom: 40px;
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