import styled from "styled-components";

export const AddCategoryContainer = styled.div`
    text-align: center;
    
`;

export const NewCategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`;

export const AddCategoryTitle = styled.h2`

`;

export const AddCategorySubtitle = styled.h4`
    margin: 10px;
`;

export const AddCategoryInput = styled.input`
    margin: 8px;
    padding: 2px;    
    width: 300px;
`;

export const AddCategoryLabel = styled.label`

`;

export const AddCategorySelector = styled.select`
    margin: 10px;
    padding: 2px;
`;

export const AddCategoryOption = styled.option`

`;

export const AddCategoryTextarea = styled.textarea`
    margin: 8px;
    padding: 2px;    
    width: 300px;
    height: 100px;
`;

export const AddCategoryButton = styled.button`
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