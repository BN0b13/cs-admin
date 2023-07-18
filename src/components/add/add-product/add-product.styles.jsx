import styled from "styled-components";

export const AddProductContainer = styled.div`
    text-align: center;
    
`;

export const NewProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`;

export const CategoryContainer = styled.div`
    margin: 30px 0;
`;

export const AddProductTitle = styled.h2`

`;

export const AddProductSubtitle = styled.h4`

`;

export const AddProductText = styled.h6`

`;

export const AddProductCategoryLabel = styled.label`

`;

export const AddProductCategorySelector = styled.select`

`;

export const AddProductCategoryOption = styled.option`

`;

export const AddProductInput = styled.input`
    margin: 8px;
    padding: 2px;    
    width: 300px;
`;

export const AddProductTextarea = styled.textarea`
    margin: 8px;
    padding: 2px;    
    width: 300px;
    height: 100px;
`;

export const AddProductButton = styled.button`
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