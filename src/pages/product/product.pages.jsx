import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';

import Client from '../../tools/client';
import { url } from '../../config';

const client = new Client();

const ProductPage = () => {
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();
    const [ product, setProduct ] = useState('');

    useEffect(() => {
        const getProduct = async () => {
            const res = await client.getProductById(id);

            console.log('Res: ', res.rows[0]);

            setProduct(res.rows[0]);
            setLoading(false);
        }

        getProduct();
    }, []);

    const productDisplay = () => {

        return (
            <>
                <h6 onClick={() => window.location.href = `${url}/products`}>Back to Products</h6>
                <h4>Name: {product.name}</h4>
                <h4>Description: {product.description}</h4>
                <h4>Time: {product.time}</h4>
                <h4>Lineage: {product.mother} x {product.father}</h4>
                <h4>Sex: {product.sex}</h4>
            </>
        )
    }

    return (
        <div>
            {loading ?
                <Spinner />
            :
                product.length === 0 ?
                    <h2>No Product to Display</h2>
                :
                    productDisplay()
            }
        </div>
    )
}

export default ProductPage;