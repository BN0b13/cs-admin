import React, { useEffect, useState } from 'react';

import Spinner from '../reusable/spinner/spinner.component';

import Client from '../../tools/client';
import Tools from '../../tools/tools';

import {
  MainContainer
} from '../../styles/component.styles';

import {
    CustomersContainer,
    CustomersTable,
    CustomersTableBody,
    CustomersTableData,
    CustomersTableHead,
    CustomersTableHeadData,
    CustomersTableRow,
    CustomersSubTitle,
    CustomersTitle
} from './customers.styles';

const client = new Client();
const tools = new Tools();

const Customers = () => {
   const [ customers, setCustomers ] = useState(null);

   useEffect(() => {

    getCustomers();
   }, []);

   const getCustomers = async () => {
    const res = await client.getCustomers();
    const sortedCustomers = tools.sortByDateAscending(res.rows);
    setCustomers(sortedCustomers);
  }

    return (
      <MainContainer>
        {loading ?
          <Spinner />
        :
        <CustomersContainer>
        <CustomersTitle>Customers</CustomersTitle>
        {customers.length === 0 ? 
          <CustomersSubTitle>No Customers to display.</CustomersSubTitle>
        :
          <CustomersTable>
            <CustomersTableHead>
                <CustomersTableRow>
                  <CustomersTableHeadData>
                    First Name
                  </CustomersTableHeadData>
                  <CustomersTableHeadData>
                    Last Name
                  </CustomersTableHeadData>
                  <CustomersTableHeadData>
                    Email
                  </CustomersTableHeadData>
                </CustomersTableRow>
              </CustomersTableHead>
              <CustomersTableBody>
                {customers.map((customer, index) => {
                  // const formattedDate = new Date(customer.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                  return (
                    <CustomersTableRow key={index}>
                      <CustomersTableData>
                      { customer.firstName }
                      </CustomersTableData>
                      <CustomersTableData>
                      { customer.lastName }
                      </CustomersTableData>
                      <CustomersTableData>
                      { customer.email }
                      </CustomersTableData>
                    </CustomersTableRow>
                  )
                })}
              </CustomersTableBody>
          </CustomersTable>
        }
      </CustomersContainer>
        }
      </MainContainer>
    );
}

export default Customers;