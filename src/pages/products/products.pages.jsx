import { useState } from 'react';

import AddProduct from '../../components/add-product/add-product.component';
import FlavorProfile from '../../components/flavor-profile/flavor-profile.component';
import Categories from '../../components/categories/categories.component';
import Products from '../../components/products/products.component';

import {
    TabContainer,
    TabSelector
} from './products.styles';

const ProductsPage = () => {
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);
    const [ tabFourActive, setTabFourActive ] = useState(false);

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

    const activateTabFour = () => {
        setCurrentTab(4);
        setTabOneActive(false);
        setTabTwoActive(false);
        setTabThreeActive(false);
        setTabFourActive(true);
    }

    const showCurrentTab = () => {
        if(currentTab === 2) {
            return (
                <Categories />
            )
        }

        if(currentTab === 3) {
            return (
                <AddProduct />
            )
        }

        if(currentTab === 4) {
            return (
                <FlavorProfile />
            )
        }

        return (
            <Products />
        )
    }

    return (
        <div>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Products</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Categories</TabSelector>
                <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Add Product</TabSelector>
                <TabSelector active={tabFourActive} onClick={() => activateTabFour()}>Flavor Profiles</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </div>
    )
}

export default ProductsPage;