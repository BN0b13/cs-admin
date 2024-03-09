import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 5px;
`;

export const WordBreakContainer = styled.div`
    max-width: 300px;
    word-break: break-all;
    text-wrap: wrap;
`;

export const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
`;

export const TabSelector = styled.button`
    background-color: ${props => props.active ? '#ccc' : 'inherit'};
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    transition: 0.3s;
    width: 100%;

    :hover {
        background-color: ${props => props.active ? '#ccc' :'#ddd'};
    }
`;

export const MainTitle = styled.h2`
    text-align: center;
`;

export const BackLink = styled.h4`
  cursor: pointer;
`;

export const Text = styled.h4`

`;