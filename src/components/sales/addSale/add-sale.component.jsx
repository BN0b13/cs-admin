import { useState } from 'react';

import Button from '../../reusable/button/button.component';

import Client from '../../../tools/client';

import {
    MainContainer,
    SaleContainer,
    SaleInput,
    SaleOption,
    SaleSelect,
    SaleTextarea
} from './add-sale.styles';

const client = new Client();

const AddSale = () => {
    const [ categoryId, setCategoryId ] = useState('');
    const [ productId, setProductId ] = useState('');
    const [ inventoryId, setInventoryId ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ type, setType ] = useState('');
    const [ value, setValue ] = useState('');
    const [ expirationDate, setExpirationDate ] = useState('');
    const [ expirationType, setExpirationType ] = useState('');

    const createSale = async () => {
        if(name === '' || type === '') { 
            console.log('REJECTED!');
            return
        }

        const data = {
            name,
            type
        }

        if (categoryId !== '') { data.categoryId = categoryId };
        if (productId !== '') { data.productId = productId };
        if (inventoryId !== '') { data.inventoryId = inventoryId };
        if (description !== '') { data.description = description };
        if (value !== '') { data.value = value };
        if (expirationDate !== '') { data.expirationDate = expirationDate };
        if (expirationType !== '') { data.expirationType = expirationType };

        const res = await client.createSale(data);

        if(res.status === 201) {
            setCategoryId('');
            setProductId('');
            setInventoryId('');
            setName('');
            setDescription('');
            setType('');
            setValue('');
            setExpirationDate('');
            setExpirationType('');
        }

        console.log('CREATE sale res: ', res);
    }

    return (
        <MainContainer>
            <p>Add Sale</p>
            <SaleContainer>
                <SaleInput value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                <SaleTextarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                <SaleSelect value={type} onChange={(e) => setType(e.target.value)} placeholder='Type' defaultValue={''} >
                    <SaleOption key={0}  disabled value={''}> -- select an option -- </SaleOption>
                    <SaleOption value={'bogo'}>BOGO</SaleOption>
                </SaleSelect>


                <Button onClick={() => createSale()}>Add Sale</Button>
            </SaleContainer>
        </ MainContainer>
    )
}

export default AddSale;