import { useState } from 'react';

import Spinner from '../../spinner/spinner.component';

import { url } from '../../../../config';

import {
    MainContainer,
    OrderMainTable,
    OrderTableBody,
    OrderTableHead,
    OrderTableHeader,
    OrderTableRow,
    OrderTableData
} from './order-table.styles';

const OrderTable = ({ orders }) => {

    return (
        <MainContainer>
            {orders.length === 0 ?
                <h2>No Orders To Display</h2>
            :
                <OrderMainTable>
                    <OrderTableHeader>
                        <OrderTableRow>
                            <OrderTableHead>Status</OrderTableHead>
                            <OrderTableHead>Date</OrderTableHead>
                        </OrderTableRow>
                    </OrderTableHeader>
                    <OrderTableBody>
                    {orders.map((order, index) => (
                            <OrderTableRow key={index}>
                                <OrderTableData><a href={`${url}/orders/${order.id}`}>{order.status}</a></OrderTableData>
                                <OrderTableData>{order.creationDate}</OrderTableData>
                            </OrderTableRow>
                    ))}
                    </OrderTableBody>
                </OrderMainTable>
            }
        </MainContainer>
    )
}

export default OrderTable;