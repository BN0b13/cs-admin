import styled from 'styled-components';

export const ModalDiv = styled.div`
    background: #fff;
    padding: 40px;
    color: black;
    text-align: left;
    height: 80vh;
    max-width: 800px;
    overflow-y: auto;
`;

export const TextContainer = styled.div`
    overflow-y: initial !important;
`;

export const ModalTitle = styled.h2`
    text-align: center;
`;

export const ModalHeading= styled.h4`
    text-align: center;
`;

export const ModalSubheading= styled.h5`
    text-align: center;
`;

export const Modal = styled.div`
    z-index: 4500;
    display: ${({show}) => (show ? 'flex' : 'none')} !important;
    position: fixed;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.9);
    
`;

export const ModalUl = styled.ul`

`;

export const ModalLi = styled.li`

`;

export const ModalButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 30px 0;
`;