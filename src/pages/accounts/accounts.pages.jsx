import { useEffect, useState } from 'react';

import Spinner from '../../components/spinner/spinner.component';
import UsersTable from '../../components/users-table/users-table.component';

import Client from '../../tools/client';

import {
    AccountsTitle,
    TabContainer,
    TabSelector
} from './accounts.styles';

const client = new Client();

const Accounts = () => {
    const [ loading, setLoading ] = useState(true);
    const [ customerAccounts, setCustomerAccounts ] = useState(null);
    const [ employeeAccounts, setEmployeeAccounts ] = useState(null);

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);

    useEffect(() => {
        getCustomerAccounts();
    }, []);

    const getCustomerAccounts = async () => {
        const customers = await client.getCustomers();
        const employees = await client.getEmployees();

        setCustomerAccounts(customers.rows);
        setEmployeeAccounts(employees.rows);
        setLoading(false);
    }

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
        setTabThreeActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
        setTabThreeActive(false);
    }

    const activateTabThree = () => {
        setCurrentTab(3);
        setTabOneActive(false);
        setTabTwoActive(false);
        setTabThreeActive(true);
    }

    const showCurrentTab = () => {

        if(currentTab === 2) {
            return (
                <>
                    <AccountsTitle>Employees</AccountsTitle>
                    <UsersTable users={employeeAccounts} />
                </>
            )
        }

        if(currentTab === 3) {
            return (
                <AccountsTitle>Add Account</AccountsTitle>
            )
        }

        return (
            <>
                {loading ?
                    <Spinner />
                :
                    <>
                        <AccountsTitle>Customers</AccountsTitle>
                        <UsersTable users={customerAccounts} />
                    </>
                }
            </>
        )
    }

    return (
        <div>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Customers</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Employees</TabSelector>
                <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Add Account</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </div>
    )
}

export default Accounts;