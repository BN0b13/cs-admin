import { useEffect, useState } from 'react';

import AddAccount from '../../components/accounts/add-account/add-account.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import SearchBar from '../../components/reusable/search-bar/search-bar.component';
import UsersTable from '../../components/reusable/tables/users-table/users-table.component';

import Client from '../../tools/client';

import {
    TabContainer,
    TabSelector
} from './accounts.styles';

import {
    MainContainer,
    MainTitle
} from '../../styles/page.styles';

const client = new Client();

const Accounts = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadData, setLoadData ] = useState(true);
    const [ roles, setRoles ] = useState([]);
    const [ accounts, setAccounts ] = useState(null);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(100);
    const [ search, setSearch ] = useState('');
    const [ sortKey, setSortKey ] = useState('');
    const [ sortDirection, setSortDirection ] = useState('');

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);

    useEffect(() => {
        getRoles();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(loadData) {
            getAccounts();
            setLoadData(false);
        }

    }, [ loadData ]);

    const getAccounts = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;
        search && (query = query + `&search=${search}`);
        sortDirection && (query = query + `&sortDirection=${sortDirection}`);
        sortKey && (query = query + `&sortKey=${sortKey}`);
        const res = await client.getUsers(query);
        setAccounts(res.rows);
        setLoading(false);
    }

    const getRoles = async () => {
        const res = await client.getRoles();
        setRoles(res.rows);
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
                        <SearchBar 
                            search={search}
                            setSearch={setSearch}
                            submitSearch={setLoadData}
                        />
                        <UsersTable 
                            users={accounts}
                            sortKey={sortKey}
                            setSortKey={setSortKey}
                            sortDirection={sortDirection}
                            setSortDirection={setSortDirection}
                            reloadTable={setLoadData}
                        />
                    </>
                }
            </>
        )
    }

    return (
        <MainContainer>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Accounts</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Add Account</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </MainContainer>
    )
}

export default Accounts;