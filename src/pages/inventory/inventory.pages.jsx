import { useEffect, useState } from 'react';

import Views from '../../components/metrics/views/views.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    MainTitle,
    TabContainer,
    TabSelector
} from './inventory.styles';

const client = new Client();

const InventoryPage = () => {
    const [ loading, setLoading ] = useState(true);
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
                <MainTitle>Inventory Count</MainTitle>
            )
        }

        if(currentTab === 3) {
            return (
                <MainTitle>tab 3</MainTitle>
            )
        }

        return (
            <>
                {loading ?
                    <Spinner />
                :
                <MainTitle>Inventory Page</MainTitle>
                }
            </>
        )
    }

    return (
        <div>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Inventory</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Inventory Count</TabSelector>
                <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Tab 3</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </div>
    )
}

export default InventoryPage;