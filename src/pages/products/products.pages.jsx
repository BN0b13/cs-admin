import { useEffect, useState } from 'react';

import AddProduct from '../../components/product/add-product/add-product.component';
import ProductProfile from '../../components/product-profile/product-profile.component';
import SearchBar from '../../components/reusable/search-bar/search-bar.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import ProductsTable from '../../components/reusable/tables/products-table/products-table.component';

import Client from '../../tools/client';
import Tools from '../../tools/tools';

import {
    TabContainer,
    TabSelector
} from './products.styles';

import {
    MainTitle
} from '../../styles/page.styles';

const client = new Client();
const tools = new Tools();

const ProductsPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loadData, setLoadData ] = useState(true);
    const [ products, setProducts ] = useState([]);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(100);
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
                    <>
                        <MainTitle>Products</MainTitle>
                        <SearchBar 
                            search={search}
                            setSearch={setSearch}
                            submitSearch={setLoadData}
                        />
                        <ProductsTable 
                            products={products}
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