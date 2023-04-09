import React, { useEffect, useState } from 'react';

import Spinner from '../spinner/spinner.component';

import Client from '../../tools/client';

import {
    AccountsContainer,
    AccountsTable,
    AccountsTableBody,
    AccountsTableData,
    AccountsTableHead,
    AccountsTableHeadData,
    AccountsTableRow,
    AccountsSubTitle,
    AccountsTitle
} from './accounts.styles';

const client = new Client();

const Accounts = () => {
   const [ accounts, setAccounts ] = useState(null);

   useEffect(() => {
    const getAccounts = async () => {
      const res = await client.getAccounts();
      setAccounts(res.rows);
    }

    getAccounts();
   }, []);

   if(!accounts) {
    return (
      <Spinner />
    );
   }

    return (
      <AccountsContainer>
        <AccountsTitle>Accounts</AccountsTitle>
        {accounts.length === 0 ? 
          <AccountsSubTitle>No Accounts to display.</AccountsSubTitle>
        :
          <AccountsTable>
            <AccountsTableHead>
                <AccountsTableRow>
                  <AccountsTableHeadData>
                    First Name
                  </AccountsTableHeadData>
                  <AccountsTableHeadData>
                    Last Name
                  </AccountsTableHeadData>
                  <AccountsTableHeadData>
                    Email
                  </AccountsTableHeadData>
                  <AccountsTableHeadData>
                    Phone
                  </AccountsTableHeadData>
                  <AccountsTableHeadData>
                    Address
                  </AccountsTableHeadData>
                  <AccountsTableHeadData>
                    City
                  </AccountsTableHeadData>
                  <AccountsTableHeadData>
                    State
                  </AccountsTableHeadData>
                  <AccountsTableHeadData>
                    Zip Code
                  </AccountsTableHeadData>
                  <AccountsTableHeadData>
                    Email List
                  </AccountsTableHeadData>
                  <AccountsTableHeadData>
                    Email Verified
                  </AccountsTableHeadData>
                  <AccountsTableHeadData>
                    Join Date
                  </AccountsTableHeadData>
                </AccountsTableRow>
              </AccountsTableHead>
              <AccountsTableBody>
                {accounts.map((account, index) => {
                  const formattedDate = new Date(account.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                  return (
                    <AccountsTableRow key={index}>
                      <AccountsTableData>
                      { account.firstName }
                      </AccountsTableData>
                      <AccountsTableData>
                      { account.lastName }
                      </AccountsTableData>
                      <AccountsTableData>
                      { account.email }
                      </AccountsTableData>
                      <AccountsTableData>
                      { account.phone }
                      </AccountsTableData>
                      <AccountsTableData>
                      { account.address }
                      </AccountsTableData>
                      <AccountsTableData>
                      { account.city }
                      </AccountsTableData>
                      <AccountsTableData>
                      { account.state }
                      </AccountsTableData>
                      <AccountsTableData>
                      { account.zipCode }
                      </AccountsTableData>
                      <AccountsTableData>
                      { account.emailList }
                      </AccountsTableData>
                      <AccountsTableData>
                      { account.emailVerified }
                      </AccountsTableData>
                      <AccountsTableData>
                      { formattedDate }
                      </AccountsTableData>
                    </AccountsTableRow>
                  )
                })}
              </AccountsTableBody>
          </AccountsTable>
        }
      </AccountsContainer>
    );
}

export default Accounts;