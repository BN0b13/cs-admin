import { useEffect, useState } from 'react';

import OrdersTable from '../../components/reusable/tables/orders-table/orders-table.component';
import SearchBar from '../../components/reusable/search-bar/search-bar.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    MainContainer,
    MainTitle
} from '../../styles/page.styles';

const client = new Client();

const OrdersPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadData, setLoadData ] = useState(true);
    const [ orders, setOrders ] = useState([]);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(100);
    const [ search, setSearch ] = useState('');
    const [ sortKey, setSortKey ] = useState('');
    const [ sortDirection, setSortDirection ] = useState('');

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        if(loadData) {
            getOrders();
            setLoadData(false);
        }
    }, [ loadData ]);

    const getOrders = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;
        search && (query = query + `&search=${search}`);
        sortDirection && (query = query + `&sortDirection=${sortDirection}`);
        sortKey && (query = query + `&sortKey=${sortKey}`);
        const res = await client.getOrders(query);
        setOrders(res.rows);
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <MainTitle>Orders</MainTitle>
                    <SearchBar 
                        search={search}
                        setSearch={setSearch}
                        submitSearch={setLoadData}
                    />
                    <OrdersTable 
                        orders={orders}
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

export default OrdersPage;