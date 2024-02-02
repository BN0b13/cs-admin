import Client from '../../tools/client';

import {
    MainContainer,
    SalesTable,
    SalesTableBody,
    SalesTableHead,
    SalesTableHeader,
    SalesTableRow,
    SalesTableData
} from './sales.styles';

const client = new Client();

const Sales = ({ sales, getSales }) => {

    const changeActivationStatus = async (id) => {
        const data = {
            id
        }
        await client.changeSaleActivationStatus(data);
        await getSales();
    }

    return (
        <MainContainer>
            <SalesTable>
                <SalesTableHeader>
                    <SalesTableRow>
                        <SalesTableHead>Name</SalesTableHead>
                        <SalesTableHead>Description</SalesTableHead>
                        <SalesTableHead>Type</SalesTableHead>
                        <SalesTableHead>Created</SalesTableHead>
                        <SalesTableHead>Activation</SalesTableHead>
                    </SalesTableRow>
                </SalesTableHeader>
                <SalesTableBody>
                {sales.map((sale, index) => {
                    const formattedDate = new Date(sale.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                    return (
                        <SalesTableRow key={index}>
                            <SalesTableData>{ sale.name }</SalesTableData>
                            <SalesTableData>{ sale.description } {sale.lastName}</SalesTableData>
                            <SalesTableData>{ sale.type }</SalesTableData>
                            <SalesTableData>{formattedDate}</SalesTableData>
                            <SalesTableData><button onClick={() => changeActivationStatus(sale.id)}>{sale.active ? 'On' : 'Off'}</button></SalesTableData>
                        </SalesTableRow>
                )})}
                </SalesTableBody>
            </SalesTable>
        </MainContainer>
    )
}

export default Sales;