import { useEffect, useState } from 'react';

import CustomerMetrics from '../../components/metrics/customer-metrics/customer-metrics.component';
import OrderMetrics from '../../components/metrics/order-metrics/order-metrics.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import ViewMetrics from '../../components/metrics/view-metrics/view-metrics.component';

import Client from '../../tools/client';

import {
    TabContainer,
    TabSelector
} from './metrics.styles';

const client = new Client();

const MetricsPage = () => {
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
                <CustomerMetrics />
            )
        }

        if(currentTab === 3) {
            return (
                <OrderMetrics />
            )
        }

        return (
            <>
                {loading ?
                    <Spinner />
                :
                <ViewMetrics />
                }
            </>
        )
    }

    return (
        <div>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Views</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Customers</TabSelector>
                <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Sales</TabSelector>
            </TabContainer>
            { showCurrentTab() }
        </div>
    )
}

export default MetricsPage;