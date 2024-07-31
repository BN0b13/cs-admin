import { useEffect, useState } from 'react';

import OrdersTable from '../../components/reusable/tables/orders-table/orders-table.component';
import Pagination from '../../components/reusable/pagination/pagination.component';
import SearchBar from '../../components/reusable/search-bar/search-bar.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    ContentContainer,
    MainContainer,
    MainTitle,
    Option,
    Select
} from '../../styles/page.styles';

const client = new Client();

const OrdersPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadData, setLoadData ] = useState(true);
    const [ orders, setOrders ] = useState([]);
    const [ ordersCount, setOrdersCount ] = useState(null);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(10);
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
        setOrdersCount(res.count);
        setLoading(false);
    }

    const changeSize = (data) => {
        setSize(data);
        setPage(0);
        setLoadData(true);
    }

    const changePage = (data) => {
        setPage(data);
        setLoadData(true);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <ContentContainer>
                    <MainTitle>Orders</MainTitle>
                    <SearchBar 
                        search={search}
                        setSearch={setSearch}
                        submitSearch={setLoadData}
                    />
                    <Select value={size} onChange={(e) => changeSize(e.target.value)} maxWidth={'100px'} marginBottom={'20px'}>
                            <Option key={1} value={10}>10</Option>
                            <Option key={2} value={25}>25</Option>
                            <Option key={3} value={50}>50</Option>
                            <Option key={4} value={100}>100</Option>
                        </Select>
                    <OrdersTable 
                        orders={orders}
                        sortKey={sortKey}
                        setSortKey={setSortKey}
                        sortDirection={sortDirection}
                        setSortDirection={setSortDirection}
                        reloadTable={setLoadData}
                    />
                    <Pagination
                        count={ordersCount}
                        size={size}
                        page={page}
                        changePage={changePage}
                    />
                </ContentContainer>
            }
        </MainContainer>
    )
}

export default OrdersPage;