import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px;
`;

export const ImageDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    height: 200px;
    width: 250px;
`;

export const DetailContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 8px;
`;

export const DetailLabel = styled.p`
    font-weight: bold;
    margin: 0 5px 10px 0;
`;

export const DetailText = styled.p`
    margin: 0 5px 10px 5px;
`;

export const EditDetailsButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 50px;
`;

export const EditDetailsInput = styled.input`
    margin-top: 10px;
`;

export const EditDetailsDeleteButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: red;
    border: none;
    border-radius: 2px;
    margin-top: 10px;
    height: 23px;
    width: 100%;

    &:hover {
        color: red;
        background-color: #fff;
        border: red solid 1px;
    }
`;

export const EditDetailsButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: #000;
    border: none;
    border-radius: 2px;
    margin: 10px 1px 0 1px;
    width: 100%;

    &:hover {
        color: #000;
        background-color: #fff;
        border: #000 solid 1px;
    }
`;

export const CloseIconContainer = styled.div`
    display: flex;
    justify-content: end;
    margin: 5px 0;
    width: 100%;
`;

