import {
    MainContainer,
    ProductInventoryTableBody,
    ProductInventoryTable,
    ProductInventoryTableHeader,
    ProductInventoryTableHead,
    ProductInventoryTableData,
    ProductInventoryTableRow
} from './product-inventory.styles';

const ProductInventory = ({ inventories, handleInventoryUpdateDisplay = () => {} }) => {

    return (
        <MainContainer>
            <ProductInventoryTable>
            <ProductInventoryTableHeader>
              <ProductInventoryTableRow>
                <ProductInventoryTableHead>
                  Sku
                </ProductInventoryTableHead>
                <ProductInventoryTableHead>
                  Size
                </ProductInventoryTableHead>
                <ProductInventoryTableHead>
                  Quantity
                </ProductInventoryTableHead>
                <ProductInventoryTableHead>
                  Address
                </ProductInventoryTableHead>
                <ProductInventoryTableHead>
                  Bay
                </ProductInventoryTableHead>
                <ProductInventoryTableHead>
                  Date Created
                </ProductInventoryTableHead>
              </ProductInventoryTableRow>
            </ProductInventoryTableHeader>
            <ProductInventoryTableBody>
              {inventories.map((inventory, index) => {
                const formattedDate = new Date(inventory.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
                
                return (
                  <ProductInventoryTableRow key={index} onClick={() => handleInventoryUpdateDisplay(index)}>
                    <ProductInventoryTableData>
                        { inventory.sku }
                    </ProductInventoryTableData>
                    <ProductInventoryTableData>
                        { inventory.size }
                    </ProductInventoryTableData>
                    <ProductInventoryTableData>
                        { inventory.quantity }
                    </ProductInventoryTableData>
                    <ProductInventoryTableData>
                        { inventory.address }
                    </ProductInventoryTableData>
                    <ProductInventoryTableData>
                        { inventory.bay }
                    </ProductInventoryTableData>
                    <ProductInventoryTableData>
                        { formattedDate }
                    </ProductInventoryTableData>
                  </ProductInventoryTableRow>
                )
              })}
            </ProductInventoryTableBody>
          </ProductInventoryTable>
        </MainContainer>
    )
}

export default ProductInventory;