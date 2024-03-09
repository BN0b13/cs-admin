import styled from 'styled-components';

import { setMobileView } from '../../../tools/mobileView';

export const AddressContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: ${setMobileView() ? '280px' : '320px'};
`;

export const AddressTopContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const AddressBottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`;

export const AddressInput = styled.input`
    width:  ${setMobileView() ? '260px' : '300px'};
    margin: 5px 0;
    padding: 3px;
`;

export const AddressZipCodeInput = styled.input`
    width:  ${setMobileView() ? '45px' : '55px'};
    margin: 5px 0;
    padding: 3px;
`;

export const AddressCityInput = styled.input`
    width:  ${setMobileView() ? '145px' : '160px'};
    margin: 5px 0;
    padding: 3px;
`;

export const AddressDropdown = styled.select`
    width:  ${setMobileView() ? '40px' : '50px'};
    margin: 5px 10px;
`;

export const AddressDropdownOption = styled.option`

`;