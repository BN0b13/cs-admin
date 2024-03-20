import { useContext, useState } from 'react';
import Select from 'react-select';

import Button from '../../reusable/button/button.component';

import { ToastContext } from '../../../contexts/toast.context';

import Client from '../../../tools/client';

import {
    ContentContainer,
    Input,
    MainContainer,
    RowContainer,
    Textarea,
    Title
} from '../../../styles/component.styles';

const client = new Client();

const AddSale = ({ setShowAddSale }) => {
    const [ categoryId, setCategoryId ] = useState('');
    const [ productId, setProductId ] = useState('');
    const [ inventoryId, setInventoryId ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ type, setType ] = useState('');
    const [ value, setValue ] = useState('');
    const [ expirationDate, setExpirationDate ] = useState('');
    const [ expirationType, setExpirationType ] = useState('');

    const { errorToast } = useContext(ToastContext);

    const options = [
        { value: '', label: '-- Select an Option --', isDisabled: true },
        { value: 'bogo', label: 'BOGO' }
    ];

    const createSale = async () => {
        if(name === '' || type === '') { 
            errorToast('Please fill in all fields to create sale.');
            return
        }

        const data = {
            name,
            type
        };

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
    }

    return (
        <MainContainer>
            <Title>Add Sale</Title>
            <ContentContainer>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                <RowContainer margin={'20px 0'}>
                    <Select
                        defaultValue={type}
                        onChange={setType}
                        options={options}
                    />
                </RowContainer>

                <RowContainer>
                    <Button onClick={() => setShowAddSale(false)}>Cancel</Button>
                    <Button onClick={() => createSale()}>Add Sale</Button>
                </RowContainer>
            </ContentContainer>
        </ MainContainer>
    )
}

export default AddSale;