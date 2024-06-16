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
    const [ products, setProducts ] = useState([]);
    const [ currentProducts, setCurrentProducts ] = useState([]);
    const [ currentSort, setCurrentSort ] = useState({
        direction: 'descending',
        column: 'createdAt'
    });

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const res = await client.getProducts();
        setProducts(res.rows);
        sort(res.rows);
    }

    const sort = (data) => {
        setLoading(true);
        const sorted = tools.sortByDateDescending(data);
        setCurrentSort({
            direction: 'descending',
            column: 'createdAt'
        });
        setCurrentProducts(sorted);
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
                
        const sortedAccounts = tools.sort(currentProducts, sortDirection, sortColumn);
        setCurrentProducts(sortedAccounts);
        setCurrentSort({
            direction: sortDirection,
            column: sortColumn
        });

        setLoading(false);
    }

    const setSearchResults = async (params) => {
        const res = await client.searchProducts(params);
        sort(res.rows);
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
                        <SearchBar setSearchResults={setSearchResults} clearSearchResults={getProducts} />
                        <ProductsTable products={currentProducts} setSort={changeSort} currentSort={currentSort} />
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