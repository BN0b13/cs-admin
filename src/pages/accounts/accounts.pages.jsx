import { useEffect, useState } from 'react';

import AddAccount from '../../components/accounts/add-account/add-account.component';
import Filter from '../../components/reusable/filter/filter.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import SearchBar from '../../components/reusable/search-bar/search-bar.component';
import UsersTable from '../../components/reusable/tables/users-table/users-table.component';

import Client from '../../tools/client';
import Tools from '../../tools/tools';

import {
    TabContainer,
    TabSelector
} from './accounts.styles';

import {
    MainTitle
} from '../../styles/page.styles';

const client = new Client();
const tools = new Tools();

const Accounts = () => {
    const [ loading, setLoading ] = useState(true);
    const [ roles, setRoles ] = useState([]);
    const [ accounts, setAccounts ] = useState(null);
    const [ currentAccounts, setCurrentAccounts ] = useState(null);
    const [ currentSort, setCurrentSort ] = useState({
        direction: 'descending',
        column: 'createdAt'
    });

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);

    useEffect(() => {
        getAccounts();
        getRoles();
    }, []);

    const getAccounts = async () => {
        setLoading(true);
        const res = await client.getAccounts();
        setAccounts(res.rows);
        sort(res.rows);
        setLoading(false);
    }

    const getRoles = async () => {
        const res = await client.getRoles();
        setRoles(res.rows);
    }

    const sort = (data) => {
        setLoading(true);
        const sorted = tools.sortByDateDescending(data);
        setCurrentSort({
            direction: 'descending',
            column: 'createdAt'
        });
        setCurrentAccounts(sorted);
        setLoading(false);
    }

    const changeSort = (sortColumn) => {
        setLoading(true);
        const sortDirection = sortColumn === currentSort.column ?
            currentSort.direction === 'ascending' ?
                'descending'
            :
                'ascending'
            :
                'descending';
                
        const sortedAccounts = tools.sort(currentAccounts, sortDirection, sortColumn);
        setCurrentAccounts(sortedAccounts);
        setCurrentSort({
            direction: sortDirection,
            column: sortColumn
        });

        setLoading(false);
    }

    const filterAccounts = async (filter) => {
        if(filter === '') {
            sort(accounts);
            return
        }

        const currentRole = roles.filter(role => role.role === filter);
        const filteredAccounts = accounts.filter(account => account.roleId === currentRole[0].id);
        sort(filteredAccounts);
    }

    const setSearchResults = async (params) => {
        const res = await client.searchAccounts(params);
        sort(res.rows);
    }

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
    }

    const showCurrentTab = () => {

        if(currentTab === 2) {
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
                        <MainTitle>Accounts</MainTitle>
                        <SearchBar setSearchResults={setSearchResults} clearSearchResults={getAccounts} />
                        <Filter filterOptions={roles} filterName={'Account Types'} setFilter={filterAccounts} />
                        <UsersTable users={currentAccounts} setSort={changeSort} currentSort={currentSort} />
                    </>
                }
            </>
        )
    }

    return (
        <div>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Accounts</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Add Account</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </div>
    )
}

export default Accounts;