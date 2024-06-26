import { useEffect, useState } from 'react';

import CompaniesTable from '../../components/reusable/tables/compaies-table/companies-table.component';
import SearchBar from '../../components/reusable/search-bar/search-bar.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    MainContainer,
    MainTitle
} from '../../styles/page.styles';

const client = new Client();

const CompaniesPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadData, setLoadData ] = useState(true);
    const [ companies, setCompanies ] = useState([]);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(100);
    const [ search, setSearch ] = useState('');
    const [ sortKey, setSortKey ] = useState('');
    const [ sortDirection, setSortDirection ] = useState('');

    useEffect(() => {
        getCompanies();
    }, []);

    useEffect(() => {
        if(loadData) {
            getCompanies();
            setLoadData(false);
        }
    }, [ loadData ]);

    const getCompanies = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;
        search && (query = query + `&search=${search}`);
        sortDirection && (query = query + `&sortDirection=${sortDirection}`);
        sortKey && (query = query + `&sortKey=${sortKey}`);
        const res = await client.getCompanies(query);
        setCompanies(res.rows);
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <MainTitle>Companies</MainTitle>
                    <SearchBar 
                        search={search}
                        setSearch={setSearch}
                        submitSearch={setLoadData}
                    />
                    <CompaniesTable 
                        companies={companies}
                        sortKey={sortKey}
                        setSortKey={setSortKey}
                        sortDirection={sortDirection}
                        setSortDirection={setSortDirection}
                        reloadTable={setLoadData}
                    />
                </>
            }
        </MainContainer>
    )
}

export default CompaniesPage;