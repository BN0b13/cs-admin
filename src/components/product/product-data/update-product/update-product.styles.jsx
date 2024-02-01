import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 40px;
    height: 150px;
    width: 310px;
`;

export const ButtonRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`;

export const ProductContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
    
`;

export const UpdateLabel = styled.label`

`;

export const UpdateInput = styled.input`

`;

export const UpdateTextarea = styled.textarea`

`;

export const UpdateSelect = styled.select`

`;

export const UpdateOption = styled.option`

`;

export const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 75px;
`;

export const DeleteButton = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    margin: 0 5px 0 5px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    background-color: red;
    color: white;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }
`;