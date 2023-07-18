import { useState } from 'react';

import Orders from '../../components/orders/orders.component';

import {
    TabContainer,
    TabSelector
} from './orders.styles';

const OrdersPage = () => {
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);

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
                <div>
                    <h2>New</h2>
                </div>
            )
        }

        if(currentTab === 3) {
            return (
                <div>
                    <h2>Shipping</h2>
                </div>
            )
        }

        return (
            <Orders />
        )
    }

    return (
        <div>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Orders</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>New</TabSelector>
                <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Shipping</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </div>
    )
}

export default OrdersPage;