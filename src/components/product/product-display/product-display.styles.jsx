import styled from 'styled-components';

export const ProductButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 10vw;
  margin-top: 10vh;
`;

export const UpdateProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 360px;
`;

export const UpdateInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
`;

export const UpdateButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 330px;
`;

export const ProductDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductImage = styled.div`
  img {
    width: 300px;
    height: 300px;
    margin: 5px;
    padding: 2px;
  }
`;

export const ProductInformation = styled.div`
  text-align: left;
  margin: 5px;
  padding: 2px;
  max-width: 40vw;
`;

export const ProductText = styled.h2`
  text-align: center;
`;

export const ProductSubtext = styled.h4`
  
`;

export const ProductsLink = styled.h4`
  cursor: pointer;
`;

export const ProductDescriptionText = styled.p`
  
`;

export const ProductLabel = styled.label`
  margin-bottom: 10px;
`;

export const ProductInput = styled.input`
  margin-bottom: 10px;
`;

export const ProductTextArea = styled.textarea`
  margin-bottom: 10px;
  height: 150px;
  width: 300px;
`;