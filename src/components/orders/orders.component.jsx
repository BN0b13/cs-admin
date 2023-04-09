import React, { useEffect, useState } from 'react';

import Spinner from '../spinner/spinner.component';

import Client from '../../tools/client';

import {
    OrdersContainer,
    OrdersTable,
    OrdersTableBody,
    OrdersTableData,
    OrdersTableHead,
    OrdersTableHeadData,
    OrdersTableRow,
    OrdersSubTitle,
    OrdersTitle
} from './orders.styles';

const client = new Client();

const Orders = () => {
   const [ orders, setOrders ] = useState(null);

   useEffect(() => {
    const getOrders = async () => {
      const res = await client.getOrders();
      setOrders(res.rows);
    }

    getOrders();
   }, []);

   if(!orders) {
    return (
      <Spinner />
    );
   }

    return (
      <OrdersContainer>
        <OrdersTitle>Orders</OrdersTitle>
        {orders.length === 0 ? 
          <OrdersSubTitle>No Orders to display.</OrdersSubTitle>
        :
          <OrdersTable>
            <OrdersTableHead>
                <OrdersTableRow>
                  <OrdersTableHeadData>
                    Status
                  </OrdersTableHeadData>
                  <OrdersTableHeadData>
                    Account
                  </OrdersTableHeadData>
                  <OrdersTableHeadData>
                    Order
                  </OrdersTableHeadData>
                  <OrdersTableHeadData>
                    Total
                  </OrdersTableHeadData>
                  <OrdersTableHeadData>
                    Coupon Used
                  </OrdersTableHeadData>
                  <OrdersTableHeadData>
                    Order Date
                  </OrdersTableHeadData>
                </OrdersTableRow>
              </OrdersTableHead>
              <OrdersTableBody>
                {orders.map((order, index) => {
                  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                  return (
                    <OrdersTableRow key={index}>
                      <OrdersTableData>
                      { order.status }
                      </OrdersTableData>
                      <OrdersTableData>
                      { order.userId }
                      </OrdersTableData>
                      <OrdersTableData>
                      { order.products }
                      </OrdersTableData>
                      <OrdersTableData>
                      { order.total }
                      </OrdersTableData>
                      <OrdersTableData>
                      { order.couponId ? order.couponId : 'No Coupon Used' }
                      </OrdersTableData>
                      <OrdersTableData>
                      { formattedDate }
                      </OrdersTableData>
                    </OrdersTableRow>
                  )
                })}
              </OrdersTableBody>
          </OrdersTable>
        }
      </OrdersContainer>
    );
}

export default Orders;