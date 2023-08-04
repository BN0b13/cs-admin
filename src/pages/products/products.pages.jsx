import { useEffect, useState } from 'react';

import AddProduct from '../../components/product/add-product/add-product.component';
import ProductProfile from '../../components/product-profile/product-profile.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import ProductsTable from '../../components/reusable/tables/products-table/products-table.component';

import Client from '../../tools/client';

import {
    TabContainer,
    TabSelector
} from './products.styles';

const client = new Client();

const ProductsPage = () => {
    const [ products, setProducts ] = useState(null);

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
                {!products ?
                    <Spinner />
                :
                    <ProductsTable products={products} />
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