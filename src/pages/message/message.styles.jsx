import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const MessageDataContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const MessageContainer = styled.div`
    margin: 40px 0;
    padding: 20px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
`;

export const ContactInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin: 0 40px;
`;

export const MessageTitle = styled.h2`

`;

export const BackText = styled.h4`
    text-align: start;
    cursor: pointer;
`;

export const ContactInfoText = styled.h4`
    margin: 1px;
    padding: 2px;
`;

export const ContactInfoMessage = styled.h5`

`;

export const DeleteMessageButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: ${props => props.color};
    border: none;
    border-radius: 2px;
    margin-top: 10px;
    height: 50px;
    width: 100px;

    &:hover {
        color: ${props => props.color};
        background-color: #fff;
        border: ${props => props.color} solid 1px;
    }
`;