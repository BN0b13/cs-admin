import styled from 'styled-components';

export const ModalButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const ModalAccessButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: #5cb85c;
    border: none;
    border-radius: 2px;
    margin: 10px;
    font-size: 20px;
    width: 150px;
    height: 75px;
    padding: 5px;

    &:hover {
        color: #5cb85c;
        background-color: #fff;
        border: #5cb85c solid 1px;
    }
`;

export const ModalDenyButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: red;
    border: none;
    border-radius: 2px;
    margin: 10px;
    font-size: 20px;
    width: 150px;
    height: 75px;
    padding: 5px;

    &:hover {
        color: red;
        background-color: #fff;
        border: red solid 1px;
    }
`;

export const ModalDiv = styled.div`
    background: #fff;
    padding: 20px;
    text-align: center;
`;

export const ModalTitle = styled.h1`

`;

export const ModalText = styled.h4`

`;

export const Modal = styled.div`
    z-index: 100;
    display: ${({show}) => (show ? 'flex' : 'none')} !important;
    position: fixed;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.5);
`;

export const ModalInput = styled.input`
    margin: 20px 0;
`;