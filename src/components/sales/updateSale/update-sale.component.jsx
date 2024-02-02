import { useEffect, useState } from 'react';

import {
    MainContainer
} from './update-sale.styles';

const Sales = (sale, setSale) => {
    const [ updateSale, setUpdateSale ] = useState([]);

    useEffect(() => {
        
    }, []);

    return (
        <MainContainer>
            <p>Update Sale</p>
        </ MainContainer>
    )
}

export default Sales;