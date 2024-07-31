import { useContext, useState } from 'react';

import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { ToastContext } from '../../../contexts/toast.context';

import Client from '../../../tools/client';

import {
    ContentContainer,
    Input,
    MainContainer,
    Option,
    RowContainer,
    Select
} from '../../../styles/component.styles';

const client = new Client();

const AddInventory = ({ product, getProduct }) => {
    const [ loading, setLoading ] = useState(false);
    const [ type, setType ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ size, setSize ] = useState('');
    const [ sizeDescription, setSizeDescription ] = useState('');
    const [ sku, setSku ] = useState('');
    const [ addressOne, setAddressOne ] = useState('');
    const [ addressTwo, setAddressTwo ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ zipCode, setZipCode ] = useState('');
    const [ bay, setBay ] = useState('');

    const { errorToast } = useContext(ToastContext);

    const checkFields = () => {
        if(type === '' ||
        quantity === '' ||
        price === '' ||
        size === '' ||
        sizeDescription === '' ||
        sku === '') {
            console.log('Type: ', type);
            console.log('quantity: ', quantity);
            console.log('price: ', price);
            console.log('size: ', size);
            console.log('sizeDescription: ', sizeDescription);
            console.log('sku: ', sku);
            return {
                result: false,
                error: 'Please complete all fields to create inventory'
            }
        }

        return {
            result: true
        }
    }

    const submitInventory = async() => {
        setLoading(true);
        const checkFieldsResult = checkFields();
        if(checkFieldsResult.error) {
            errorToast(checkFieldsResult.error);
            setLoading(false);
            return
        }

        const data = {
            productId: product.id,
            type,
            quantity,
            price,
            size,
            sizeDescription,
            sku,
            address: {
                addressOne,
                addressTwo,
                city,
                state,
                zipCode
            },
            bay
        }

        await client.createInventory(data);
        await getProduct();
        
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <ContentContainer>
                    <Input type='number' min={0} value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Quantity' />
                    <Input type='number' min={0} value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' />
                    <RowContainer margin={'10px 0'}>
                        <Select name='inventoryType' value={type} onChange={(e) => setType(e.target.value)}>
                            <Option value={''} disabled> -- Seed Type -- </Option>
                            <Option value={'regular'}>Regular</Option>
                            <Option value={'feminized'}>Feminized</Option>
                        </Select>
                    </RowContainer>
                    <RowContainer margin={'10px 0'}>
                        <Select name='size' onChange={(e) => setSize(e.target.value)}>
                            <Option value={''} disabled> -- Pack Size -- </Option>
                            <Option value={'Full Pack'}>Full Pack</Option>
                            <Option value={'Half Pack'}>Half Pack</Option>
                        </Select>
                    </RowContainer>
                    <Input type='text' value={sizeDescription} onChange={(e) => setSizeDescription(e.target.value)} placeholder='Size Description' />
                    <Input type='text' value={sku} onChange={(e) => setSku(e.target.value)} placeholder='SKU' />
                    <Input type='text' value={addressOne} onChange={(e) => setAddressOne(e.target.value)} placeholder='Address One' />
                    <Input type='text' value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} placeholder='Address Two' />
                    <Input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' />
                    <Input type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder='State' />
                    <Input type='text' value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder='Zip Code' />
                    <Input type='text' value={bay} onChange={(e) => setBay(e.target.value)} placeholder='Bay' />

                    <RowContainer margin={'20px 0'}>
                        <Button onClick={() => submitInventory()}>Add Inventory</Button>
                    </RowContainer>
                </ContentContainer>
            }
        </MainContainer>
    )
}

export default AddInventory;