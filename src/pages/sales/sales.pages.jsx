import { useEffect, useState } from 'react';

import AddSale from '../../components/sales/addSale/add-sale.component';
import Button from '../../components/reusable/button/button.component';
import Sales from '../../components/sales/sales.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    ContentContainer,
    MainContainer
} from '../../styles/page.styles';

const client = new Client();

const SalesPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ showAddSale, setShowAddSale ] = useState(false);
    const [ sales, setSales ] = useState('');

    useEffect(() => {
        getSales();
    }, []);

    const getSales = async () => {
        setLoading(true);
        const res = await client.getSales();

        if(res.count > 0) {
            setSales(res.rows);
        }

        setLoading(false);

        return res.rows;
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <ContentContainer>
                    {showAddSale ?
                        <>
                            <AddSale setShowAddSale={setShowAddSale} />
                        </>
                    :
                        <>
                            <Button onClick={() => setShowAddSale(true)}>New Sale</Button>
                        </>
                    }
                    {sales && <Sales sales={sales} getSales={getSales} /> }
                </ContentContainer>
            }
        </MainContainer>
    )
}

export default SalesPage;