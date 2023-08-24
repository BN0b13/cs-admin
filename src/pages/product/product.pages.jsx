import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductDisplay from '../../components/product/product-display/product-display.component';
import ProductImages from '../../components/product/product-images/product-images.component';
import ProductInventory from '../../components/product/product-inventory/product-inventory.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UpdateProduct from '../../components/product/update-product/update-product.component';

import Client from '../../tools/client';
import { url } from '../../config';

import {
    MainContainer,
    MainTitle,
    TabContainer,
    TabSelector
} from './product.styles';

const client = new Client();

const ProductPage = () => {
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();
    const [ product, setProduct ] = useState('');

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const res = await client.getProductById(id);

        if(res.count !== 0) {
            setProduct(res.rows[0]);
        }
        
        setLoading(false);
        return res.rows[0];
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
                <ProductImages product={product} getProduct={getProduct} />
            )
        }

        if(currentTab === 3) {
            return (
                <UpdateProduct product={product} getProduct={getProduct} />
            )
        }

        return (
            <>
                <ProductDisplay product={product} getProduct={getProduct} />
                <ProductInventory inventories={product.Inventories} />
            </>
        );
    }

    return (
        <MainContainer>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Product</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Images</TabSelector>
                <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Update Product</TabSelector>
            </TabContainer>
            {loading ?
                <Spinner />
            :
                product.length === 0 ?
                    <MainTitle>No Product to Display</MainTitle>
                :
                    showCurrentTab() 
            }
        </MainContainer>
    )
}

export default ProductPage;