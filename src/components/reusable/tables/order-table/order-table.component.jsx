import { url } from '../../../../config';

import {
    ColumnContainer,
    Subtitle,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeader,
    TableRow
} from '../../../../styles/component.styles';

const OrderTable = ({ orders }) => {

    return (
        <ColumnContainer>
            {orders.length === 0 ?
                <Subtitle>No Orders To Display</Subtitle>
            :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {orders.map((order, index) => (
                            <TableRow key={index} onClick={() => window.location = `${url}/orders/${order.refId}`} cursor={'pointer'}>
                                <TableData>{order.status}</TableData>
                                <TableData>{order.creationDate}</TableData>
                            </TableRow>
                    ))}
                    </TableBody>
                </Table>
            }
        </ColumnContainer>
    )
}

export default OrderTable;