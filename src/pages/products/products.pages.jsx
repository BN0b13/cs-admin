import { useEffect, useState } from 'react';

import AddProduct from '../../components/product/add-product/add-product.component';
import ProductProfile from '../../components/product-profile/product-profile.component';
import SearchBar from '../../components/reusable/search-bar/search-bar.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import Pagination from '../../components/reusable/pagination/pagination.component';
import ProductsTable from '../../components/reusable/tables/products-table/products-table.component';

import Client from '../../tools/client';
import Tools from '../../tools/tools';

import {
    TabContainer,
    TabSelector
} from './products.styles';

import {
    ContentContainer,
    MainTitle,
    Option,
    Select
} from '../../styles/page.styles';

const client = new Client();
const tools = new Tools();

const ProductsPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadData, setLoadData ] = useState(true);
    const [ products, setProducts ] = useState([]);
    const [ productsCount, setProductsCount ] = useState(null);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(10);
    const [ search, setSearch ] = useState('');
    const [ sortKey, setSortKey ] = useState('');
    const [ sortDirection, setSortDirection ] = useState('');

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if(loadData) {
            getProducts();
            setLoadData(false);
        }
    }, [ loadData ]);

    const getProducts = async () => {
        setLoading(true);
        let query = `?page=${page}&size=${size}`;
        search && (query = query + `&search=${search}`);
        sortDirection && (query = query + `&sortDirection=${sortDirection}`);
        sortKey && (query = query + `&sortKey=${sortKey}`);
        const res = await client.getProducts(query);
        setProducts(res.rows);
        setProductsCount(res.count);
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
                <AddProduct />
            )
        }

        if(currentTab === 3) {
            return (
                <ProductProfile />
            )
        }

        return (
            <>
                {loading ?
                    <Spinner />
                :
                    <ContentContainer>
                        <MainTitle>Products</MainTitle>
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
                        <ProductsTable 
                            products={products}
                            sortKey={sortKey}
                            setSortKey={setSortKey}
                            sortDirection={sortDirection}
                            setSortDirection={setSortDirection}
                            reloadTable={setLoadData}
                        />
                        <Pagination
                            count={productsCount}
                            size={size}
                            page={page}
                            changePage={changePage}
                        />
                    </ContentContainer>
                }
            </>
        )
    }

    return (
        <div>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Products</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Add Product</TabSelector>
                <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Product Profiles</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </div>
    )
}

export default ProductsPage;