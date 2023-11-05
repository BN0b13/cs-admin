import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
    width: 100%;
`;

export const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    width: 100%;
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

export const MessagesTitle = styled.h2`
    text-align: center;
    margin: 20px;
`;

export const MessagesTable = styled.table`
    border: 1px solid;
    border-collapse: collapse;
`;

export const MessagesTableHeader = styled.thead`
    
`;

export const MessagesTableHead = styled.th`
    padding: 8px;
    border: 1px solid;
`;

export const MessagesTableBody = styled.tbody`
    
`;

export const MessagesTableRow = styled.tr`
    border: 1px solid;
    cursor: pointer;
`;