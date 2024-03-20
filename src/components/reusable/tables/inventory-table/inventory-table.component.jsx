import { 
    MainContainer,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableData
} from '../../../../styles/component.styles';

const InventoryTable = ({ inventories, handleInventoryUpdateDisplay = () => {} }) => {

    return (
        <MainContainer>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Sku
                </TableHead>
                <TableHead>
                  Size
                </TableHead>
                <TableHead>
                  Quantity
                </TableHead>
                <TableHead>
                  Address
                </TableHead>
                <TableHead>
                  Bay
                </TableHead>
                <TableHead>
                  Date Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventories.map((inventory, index) => {
                const formattedDate = new Date(inventory.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
                
                return (
                  <TableRow key={index} onClick={() => handleInventoryUpdateDisplay(inventory.id)} cursor={'pointer'}>
                    <TableData>
                        { inventory.sku }
                    </TableData>
                    <TableData>
                        { inventory.size }
                    </TableData>
                    <TableData>
                        { inventory.quantity }
                    </TableData>
                    <TableData>
                        { inventory.address?.city || '' }
                    </TableData>
                    <TableData>
                        { inventory.bay }
                    </TableData>
                    <TableData>
                        { formattedDate }
                    </TableData>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </MainContainer>
    )
}

export default InventoryTable;