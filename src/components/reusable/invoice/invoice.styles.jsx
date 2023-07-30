import styled from 'styled-components';

export const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const InvoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: auto;
    width: 800px;
`;

export const PrintContainer = styled.div`
    display: flex;
    flex-direction: colum;
    justify-content: end;
    width: 80%;
    margin: auto;
    padding-top: 40px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: colum;
    justify-content: center;
    margin: 60px;
`;

export const InvoiceDetailsContainer = styled.div`
    display: flex;
    flex-direction:'row';
    justify-content: space-between;
    width: 100%;
    margin: 5px;
`;

export const InvoiceAddressesContainer = styled.div`
    display: flex;
    flex-direction: 'row';
    margin: 5px;
`;

export const InvoiceAddressContainer = styled.div`
    margin: 5px;
`;

export const InvoiceHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
`;

export const InvoiceTotalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: 'end';
    margin-top: 40px;
`;

export const InvoiceTotalItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid darkgrey;
    width: 250px;
    padding: 10px;
`;

export const TrackingContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 25px;
`;

export const TrackingSubtitle = styled.h4`
    margin: 0;
`;

export const TrackingText = styled.p`
    margin: 0;
    padding-left: 10px;
`;

export const InvoiceTitle = styled.h2`
    text-align: center;
`;

export const InvoiceSubtitle = styled.h4`
    text-align: start;
    margin-bottom: 5px;
`;

export const InvoiceText = styled.p`
    margin: 1px;
`;

export const InvoiceTable = styled.table`
    margin: 40px 0;
    width: 100%;
`;

export const InvoiceTableHead = styled.thead`
    font-size: 18px;
`;

export const InvoiceTableBody = styled.tbody`

`;

export const InvoiceTableRow = styled.tr`
    
`;

export const InvoiceTableHeading = styled.th`
    
`;