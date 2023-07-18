import React, { useEffect, useState } from 'react';

import Spinner from '../reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    EmployeesContainer,
    EmployeesTable,
    EmployeesTableBody,
    EmployeesTableData,
    EmployeesTableHead,
    EmployeesTableHeadData,
    EmployeesTableRow,
    EmployeesSubTitle,
    EmployeesTitle
} from './employees.styles';

const client = new Client();

const Employees = () => {
   const [ employees, setEmployees ] = useState(null);

   useEffect(() => {
    const getEmployees = async () => {
      const res = await client.getEmployees();
      setEmployees(res.rows);
    }

    getEmployees();
   }, []);

   if(!employees) {
    return (
      <Spinner />
    );
   }

    return (
      <EmployeesContainer>
        <EmployeesTitle>Employees</EmployeesTitle>
        {employees.length === 0 ? 
          <EmployeesSubTitle>No Employees to display.</EmployeesSubTitle>
        :
          <EmployeesTable>
            <EmployeesTableHead>
                <EmployeesTableRow>
                  <EmployeesTableHeadData>
                    First Name
                  </EmployeesTableHeadData>
                  <EmployeesTableHeadData>
                    Last Name
                  </EmployeesTableHeadData>
                  <EmployeesTableHeadData>
                    Email
                  </EmployeesTableHeadData>
                </EmployeesTableRow>
              </EmployeesTableHead>
              <EmployeesTableBody>
                {employees.map((account, index) => {
                  const formattedDate = new Date(account.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                  return (
                    <EmployeesTableRow key={index}>
                      <EmployeesTableData>
                      { account.firstName }
                      </EmployeesTableData>
                      <EmployeesTableData>
                      { account.lastName }
                      </EmployeesTableData>
                      <EmployeesTableData>
                      { account.email }
                      </EmployeesTableData>
                    </EmployeesTableRow>
                  )
                })}
              </EmployeesTableBody>
          </EmployeesTable>
        }
      </EmployeesContainer>
    );
}

export default Employees;