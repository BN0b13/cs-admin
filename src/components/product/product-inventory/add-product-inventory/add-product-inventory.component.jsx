import { useState } from 'react';

import Button from '../../reusable/button/button.component';

import {
    AddInventoryContainer,
    ButtonContainer,
    InputContainer,
    MainContainer,
    ProductInventoryInput,
    ProductInventoryLabel
} from './add-product-inventory.styles';

const AddProductInventory = () => {
    const [ showAdd, setShowAdd ] = useState(false);

    const [ sku, setSku ] = useState('');
    const [ size, setSize ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    const [ addressOne, setAddressOne ] = useState('');
    const [ addressTwo, setAddressTwo ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ zipCode, setZipCode ] = useState('');
    const [ bay, setBay ] = useState('');
    const [ available, setAvailable ] = useState('');

    const createProductInventory = async () => {
        console.log('Add Product Inventory Hit');
    }

    const addProductInventoryDisplay = () => {
        if(showAdd) {
            return(
                <AddInventoryContainer>
                    <InputContainer>
                        <ProductInventoryLabel>Sku: </ProductInventoryLabel>
                        <ProductInventoryInput type='text' value={sku} onChange={(e) => setSku(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <ProductInventoryLabel>Size: </ProductInventoryLabel>
                        <ProductInventoryInput type='text' value={size} onChange={(e) => setSize(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <ProductInventoryLabel>Quantity: </ProductInventoryLabel>
                        <ProductInventoryInput type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <ProductInventoryLabel>Address: </ProductInventoryLabel>
                        <ProductInventoryInput type='text' value={addressOne} onChange={(e) => setAddressOne(e.target.value)} />
                        <ProductInventoryInput type='text' value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} />
                        <ProductInventoryInput type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                        <ProductInventoryInput type='text' value={state} onChange={(e) => setState(e.target.value)} />
                        <ProductInventoryInput type='text' value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </InputContainer>
                    <InputContainer>
                        <ProductInventoryLabel>Bay: </ProductInventoryLabel>
                        <ProductInventoryInput type='text' value={bay} onChange={(e) => setBay(e.target.value)} />
                    </InputContainer>
                    <ButtonContainer>
                        <Button onClick={() => setShowAdd(false)}>Cancel</Button>
                        <Button onClick={() => createProductInventory()}>Add Inventory</Button>
                    </ButtonContainer>
                </AddInventoryContainer>
            )
        }

        return(<Button onClick={() => setShowAdd(true)}>New Inventory</Button>)
    }

    return (
        <MainContainer>
            { addProductInventoryDisplay() }
        </MainContainer>
    )
}

export default AddProductInventory;