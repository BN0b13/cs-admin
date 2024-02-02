import { useEffect, useState } from 'react';

import AddSale from '../../components/sales/addSale/add-sale.component';
import Button from '../../components/reusable/button/button.component';
import Sale from '../../components/sales/sale/sale.component';
import Sales from '../../components/sales/sales.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    MainContainer,
    MainTitle,
} from './sales.styles';

const client = new Client();

const SalesPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ showAddSale, setShowAddSale ] = useState(false);
    const [ sales, setSales ] = useState('');
    const [ sale, setSale ] = useState('');

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

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
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
            }
        </MainContainer>
    )
}

export default SalesPage;