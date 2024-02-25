import { useEffect, useState } from 'react';

import AddSale from '../../components/sales/addSale/add-sale.component';
import Button from '../../components/reusable/button/button.component';
import Giveaway from '../../components/giveaway/giveaway.component';
import Sale from '../../components/sales/sale/sale.component';
import Sales from '../../components/sales/sales.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    MainContainer,
    MainTitle,
    TabContainer,
    TabSelector
} from './sales.styles';

const client = new Client();

const SalesPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ showAddSale, setShowAddSale ] = useState(false);
    const [ sales, setSales ] = useState('');
    const [ sale, setSale ] = useState('');

    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);

    useEffect(() => {
        getSales();
    }, []);

    const getSales = async () => {
        setLoading(true);
        const res = await client.getSales();

        if(res.count > 0) {
            setSales(res.rows);
            setSale(res.rows[0]);
        }

        setLoading(false);

        return res.rows;
    }

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
    }

    const showCurrentTab = () => {

        if(currentTab === 2) {
            return (
                <Giveaway />
            )
        }

        return (
            <>
                <MainTitle>Sales</MainTitle>
                {showAddSale ?
                    <>
                        <AddSale showAddSale={showAddSale} setShowAddSale={setShowAddSale} />
                        <Button onClick={() => setShowAddSale(false)}>Cancel</Button>
                    </>
                :
                    <>
                        <Button onClick={() => setShowAddSale(true)}>New Sale</Button>
                        <Sale sale={sale} />
                    </>
                }
                {sales && <Sales sales={sales} getSales={getSales} /> }
            </>
        )
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <TabContainer>
                        <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Sale</TabSelector>
                        <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Giveaway</TabSelector>
                    </TabContainer>
                    { showCurrentTab() }
                </>
            }
        </MainContainer>
    )
}

export default SalesPage;