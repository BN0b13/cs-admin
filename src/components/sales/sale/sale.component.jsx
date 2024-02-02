import { useEffect, useState } from 'react';

import {
    MainContainer
} from './sale.styles';

const Sale = () => {
    const [ sale, setSale ] = useState([]);

    useEffect(() => {
        
    }, []);

    return (
        <MainContainer>
            <p>Sale</p>
        </ MainContainer>
    )
}

export default Sale;