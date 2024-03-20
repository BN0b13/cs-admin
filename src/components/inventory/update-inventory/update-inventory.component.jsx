import { useContext, useState } from 'react';

import Button from '../../reusable/button/button.component';
import InventoryTable from '../../reusable/tables/inventory-table/inventory-table.component';
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

const UpdateInventory = ({ inventories, getProduct }) => {
    const [ loading, setLoading ] = useState(false);
    const [ inventoryId, setInventoryId ] = useState(inventories[0].id);
    const [ type, setType ] = useState(inventories[0].type);
    const [ quantity, setQuantity ] = useState(inventories[0].quantity);
    const [ price, setPrice ] = useState(inventories[0].price);
    const [ size, setSize ] = useState(inventories[0].size);
    const [ sizeDescription, setSizeDescription ] = useState(inventories[0].sizeDescription);
    const [ sku, setSku ] = useState(inventories[0].sku);
    const [ addressOne, setAddressOne ] = useState(inventories[0].address ? inventories[0].address.addressOne : '');
    const [ addressTwo, setAddressTwo ] = useState(inventories[0].address ? inventories[0].address.addressTwo : '');
    const [ city, setCity ] = useState(inventories[0].address ? inventories[0].address.city : '');
    const [ state, setState ] = useState(inventories[0].address ? inventories[0].address.state : '');
    const [ zipCode, setZipCode ] = useState(inventories[0].address ? inventories[0].address.zipCode : '');
    const [ bay, setBay ] = useState(inventories[0].bay);

    const { errorToast } = useContext(ToastContext);

    const changeInventoryToUpdate = (inventoryId) => {
        setLoading(true);
        const data = inventories.filter(inventory => inventory.id === inventoryId);
        setInventoryId(data[0].id);

        setType(data[0].type);
        setQuantity(data[0].quantity);
        setPrice(data[0].price);
        setSize(data[0].size);
        setSizeDescription(data[0].sizeDescription);
        setSku(data[0].sku);
        setAddressOne(data[0].address?.addressOne || '');
        setAddressTwo(data[0].address?.addressTwo || '');
        setCity(data[0].address?.city || '');
        setState(data[0].address?.state || '');
        setZipCode(data[0].address?.zipCode || '');
        setBay(data[0].bay);
        setLoading(false);
    }

    const checkFields = () => {
        if(type === '' ||
        quantity === '' ||
        price === '' ||
        size === '' ||
        sizeDescription === '' ||
        sku === '') {
            return {
                result: false,
                error: 'Please complete all fields to update inventory'
            }
        }

        return {
            result: true
        }
    }

    const updateInventory = async() => {
        setLoading(true);
        const checkFieldsResult = checkFields();
        if(checkFieldsResult.error) {
            errorToast(checkFieldsResult.error);
            setLoading(false);
            return
        }

        const data = {
            id: inventoryId,
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

        await client.updateInventory(data);
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
                        <Select name='size' value={size} onChange={(e) => setSize(e.target.value)}>
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
                        <Button onClick={() => updateInventory()}>Update Inventory</Button>
                    </RowContainer>

                    <InventoryTable inventories={inventories} handleInventoryUpdateDisplay={changeInventoryToUpdate} />
                </ContentContainer>
            }
        </MainContainer>
    )
}

export default UpdateInventory;