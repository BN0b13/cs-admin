import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Client from '../../tools/client';

const client = new Client();

const ProductPage = () => {
    const { id } = useParams();

    console.log('id: ', id);

    useEffect()

    return (
        <div>
            <h1>Product Page</h1>
            
        </div>
    )
}

export default ProductPage;