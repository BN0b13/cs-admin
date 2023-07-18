import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
`;

export const MainTitle = styled.h2`

`;

export const MainSubtitle = styled.h4`

`;

export const AddFlavorProfileInput = styled.input`
    margin: 8px;
    padding: 2px;    
    width: 300px;
`;

export const AddFlavorProfileLabel = styled.label`
    
`;

export const AddFlavorProfileTextarea = styled.textarea`
    margin: 8px;
    padding: 2px;    
    width: 300px;
    height: 100px;
`;

export const AddFlavorProfileButton = styled.button`
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    text-transform: uppercase;
    color: #fff;
    background-color: #000;
    border: none;
    border-radius: 2px;
    margin: 10px 1px 0 1px;
    height: 50px;
    width: 150px;

    &:hover {
        color: #000;
        background-color: #fff;
        border: #000 solid 1px;
    }
`;

export const AddFlavorProfileTable = styled.table`
    border: 1px solid;
    border-collapse: collapse;
`;

export const AddFlavorProfileHeader = styled.thead`

`;

export const AddFlavorProfileHead = styled.th`
    padding: 8px;
    border: 1px solid;
`;

export const AddFlavorProfileBody = styled.tbody`

`;

export const AddFlavorProfileRow = styled.tr`

`;

export const AddFlavorProfileData = styled.td`
    padding: 8px;
    border: 1px solid;
`;