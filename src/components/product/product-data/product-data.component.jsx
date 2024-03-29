import { useState } from 'react';
import { FaEdit } from "react-icons/fa";

import AddInventory from '../../inventory/add-inventory/add-inventory.component';
import Button from '../../reusable/button/button.component';
import InventoryTable from '../../reusable/tables/inventory-table/inventory-table.component';
import UpdateProduct from './update-product/update-product.component';

import { 
    RowContainer 
} from '../../../styles/component.styles';

import {
    MainContainer,
    ProductContainerRow,
    ProductDataContainer,
    ProductDataText,
    ProductDataTitle,
    ProductOptionsContainer
} from './product-data.styles';

const ProductData = ({ product, getProduct }) => {
    const [ showUpdate, setShowUpdate ] = useState(false);
    const [ showAddInventory, setShowAddInventory ] = useState(false);

    if(showUpdate) {
        return (
            <UpdateProduct product={product} getProduct={getProduct} setShowUpdate={setShowUpdate} />
        )
    }


    return (
        <MainContainer>
            <ProductOptionsContainer>
                <FaEdit onClick={() => setShowUpdate(true)} />
            </ProductOptionsContainer>
            <ProductDataContainer>
                <ProductContainerRow>
                    <ProductDataTitle>Category: </ProductDataTitle>
                    <ProductDataText>{product.Category.name}</ProductDataText>
                </ProductContainerRow>
                <ProductContainerRow>
                    <ProductDataTitle>Type: </ProductDataTitle>
                    <ProductDataText>{product.type}</ProductDataText>
                </ProductContainerRow>
                <ProductContainerRow>
                    <ProductDataTitle>Name: </ProductDataTitle>
                    <ProductDataText>{product.name}</ProductDataText>
                </ProductContainerRow>
                <ProductContainerRow>
                    <ProductDataTitle>Description: </ProductDataTitle>
                    <ProductDataText>{product.description}</ProductDataText>
                </ProductContainerRow>
                <ProductContainerRow>
                    <ProductDataTitle>Time: </ProductDataTitle>
                    <ProductDataText>{product.details.time}</ProductDataText>
                </ProductContainerRow>
                <ProductContainerRow>
                    <ProductDataTitle>Lineage: </ProductDataTitle>
                    <ProductDataText>{product.details.mother} x {product.details.father}</ProductDataText>
                </ProductContainerRow>
            </ProductDataContainer>
            {showAddInventory ?
                <RowContainer flexDirection={'column'} margin={'10px 0'}>
                    <AddInventory product={product} getProduct={getProduct} />
                    <Button onClick={() => setShowAddInventory(false)}>Cancel</Button>
                </RowContainer>
            :
                <RowContainer margin={'10px 0'}>
                    <Button onClick={() => setShowAddInventory(true)}>New Inventory</Button>
                </RowContainer>
            }
            <InventoryTable inventories={product.Inventories} />
        </MainContainer>
    )
}

export default ProductData;