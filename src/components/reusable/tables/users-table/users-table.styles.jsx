import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
    
`;

export const UserTable = styled.table`
    border: 1px solid;
    border-collapse: collapse;
`;

export const UserTableHeader = styled.thead`
    
`;

export const UserTableHead = styled.th`
    padding: 8px;
    border: 1px solid;
`;

export const UserTableBody = styled.tbody`
    
`;

export const UserTableRow = styled.tr`
    border: 1px solid;
    cursor: ${params => params.pointer ? 'pointer' : ''};
`;

export const UserTableData = styled.td`
    padding: 8px;
    border: 1px solid;
`;