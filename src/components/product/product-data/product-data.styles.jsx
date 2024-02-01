import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ProductContainerRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const ProductOptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
    width: 95%;
`;

export const ProductDataContainer = styled.div`
    text-align: left;
    max-width: 40vw;
`;

export const ProductDataTitle = styled.h4`
  
`;

export const ProductDataText = styled.p`
    margin-left: 5px;
`;