import React, { useEffect, useState } from 'react';

import OrdersItem from './orders-item/orders-item.component';
import Spinner from '../spinner/spinner.component';

import Client from '../../tools/client';

import {
  OrdersContainer,
  OrderTable,
  OrderTableBody,
  OrderTableHead,
  OrderTableRow,
  OrderTableHeading,
  OrdersText,
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
        {!orders ?
            <Spinner />
        :
            orders.length === 0 ?
                <OrdersText>No Orders To Display</OrdersText>
            :
                <OrderTable>
                    <OrderTableHead>
                        <OrderTableRow>
                            <OrderTableHeading>Date</OrderTableHeading>
                            <OrderTableHeading>Status</OrderTableHeading>
                            <OrderTableHeading>Total</OrderTableHeading>
                        </OrderTableRow>
                    </OrderTableHead>
                    <OrderTableBody>
                        {orders &&
                            orders.map((order, index) => (
                                <OrdersItem key={index} order={order} />
                            ))
                        }
                    </OrderTableBody>
                </OrderTable>
        }
    </OrdersContainer>
  );
}

export default Orders;