import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Invoice from '../../components/reusable/invoice/invoice.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

const client = new Client();

const OrderPage = () => {
    const { refId } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ order, setOrder ] = useState('');
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        getOrder();

        // eslint-disable-next-line
    }, []);

    const getOrder = async () => {
        setLoading(true);
        const res = await client.getOrderByRefId(refId);
        let orderProducts = res.products;
        
        for(let product in orderProducts) {
            const res = await client.getProductById(orderProducts[product].productId);
            orderProducts[product].product = res.data;
        }


        setProducts(orderProducts);
        setOrder(res);
        setLoading(false);
    }

    return (
        <div>
            {loading ?
                <Spinner />
            :
                <Invoice order={order} products={products} getOrder={getOrder} />
            }
        </div>
    )
}

export default OrderPage;