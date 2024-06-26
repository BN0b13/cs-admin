import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.direction ? props.direction : 'column'};
`;

export const MainForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ImagePreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 200px;
    border: 1px grey solid;
    border-radius: 3px;
`;

export const LogoPreviewImage = styled.img`
    height: 200px;
    width: 200px;
`

export const MainTitle = styled.h2`

`;

export const MainText = styled.p`
    text-align: center;
`;

export const ImageFileInput = styled.input`
    margin: 20px auto;
`;

export const AddCompanyLogoButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: #000;
    border: none;
    border-radius: 2px;
    margin: 10px 1px 0 1px;
    width: 100%;
    height: 40px;
    width: 80px;
    padding: auto;

    &:hover {
        color: #000;
        background-color: #fff;
        border: #000 solid 1px;
    }
`;

export const LogoInput = styled.input`
    display: none;
`;

export const AddCompanyLogoLabel = styled.label`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: #000;
    border: none;
    border-radius: 2px;
    margin: 10px 1px 0 1px;
    width: 100%;
    text-align: center;
    height: 40px;
    width: 80px;
    padding: auto;

    &:hover {
        color: #000;
        background-color: #fff;
        border: #000 solid 1px;
    }
`;