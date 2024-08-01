import styled from 'styled-components';

import { setMobileView } from '../../tools/mobileView';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const AddressBottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
`;


export const PasswordContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const PasswordIconContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    padding: 5px;
    width: 20px;
    height: 20px;
    margin-left: 280px;
`;

export const MainTitle = styled.h2`
    margin: 10px 0;
`;

export const MainText = styled.h4`
    margin: 10px 0 20px 0;
`;

export const MainImage = styled.img`
    height: ${setMobileView() ? '200px' : '250'};
    width: ${setMobileView() ? '200px' : '250'};
    margin-top: ${setMobileView() ? '20px' : '40px'};
`;

export const ActivateAccountInput = styled.input`
    margin: 5px;
    width: 300px;
`;

export const AddressBottomInput = styled.input`
    margin: 5px 3px;
    width: 93px;
`;

export const ActivateAccountSelect = styled.select`
    margin: 10px;
`;

export const ActivateAccountOption = styled.option`

`;

export const ActivateAccountLabel = styled.label`
    font-size: 12px;
`;

export const TermsContainer = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 280px;
    margin: 20px 0;
`;

export const TermsText = styled.span`
    cursor: pointer;
`;

export const TermsCheckbox = styled.input`
    cursor: pointer;
    margin: 0 10px;
`;