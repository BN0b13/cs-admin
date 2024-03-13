import { useEffect, useState } from 'react';

import AddAccount from '../../components/accounts/add-account/add-account.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UsersTable from '../../components/reusable/tables/users-table/users-table.component';

import Client from '../../tools/client';

import {
    AccountsTitle,
    TabContainer,
    TabSelector
} from './accounts.styles';

const client = new Client();

const Accounts = () => {
    const [ loading, setLoading ] = useState(true);
    const [ accounts, setAccounts ] = useState(null);
    const [ employeeAccounts, setEmployeeAccounts ] = useState(null);
    const [ customerAccounts, setCustomerAccounts ] = useState(null);
    const [ contributorAccounts, setContributorAccounts ] = useState(null);
    const [ driverAccounts, setDriverAccounts ] = useState(null);

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);

    useEffect(() => {
        getAccounts();
    }, []);

    const getAccounts = async () => {
        const accountsRes = await client.getAccounts();
        setAccounts(accountsRes.rows);
        const employees = accountsRes.rows.filter(account => account.roleId === 3);
        setEmployeeAccounts(employees);
        const customers = accountsRes.rows.filter(account => account.roleId === 4);
        setCustomerAccounts(customers);
        const contributors = accountsRes.rows.filter(account => account.roleId === 5);
        setContributorAccounts(contributors);
        const drivers = accountsRes.rows.filter(account => account.roleId === 6);
        setDriverAccounts(drivers);
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
                    <AccountsTitle>Contributors</AccountsTitle>
                    <UsersTable users={contributorAccounts} />
                </>
            )
        }

        if(currentTab === 3) {
            return (
                <AddAccount getAccounts={getAccounts} />
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
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Contributors</TabSelector>
                <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Add Account</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </div>
    )
}

export default Accounts;