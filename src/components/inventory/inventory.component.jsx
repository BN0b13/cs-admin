import React, { useEffect, useState } from 'react';

import Spinner from '../spinner/spinner.component';

import Client from '../../tools/client';

import {
  InventoryContainer,
  InventoryTable,
  InventoryTableBody,
  InventoryTableData,
  InventoryTableHead,
  InventoryTableHeadData,
  InventoryTableRow,
  InventorySubTitle,
  InventoryTitle
} from './inventory.styles';

const client = new Client();

const Inventory = () => {
  const [ inventory, setInventory ] = useState(null);

  useEffect(() => {
    const getInventory = async () => {
      const res = await client.getInventory();
      setInventory(res);
    }

    getInventory();
  }, []);

  if(!inventory) {
    return (
      <Spinner />
    );
  }

  return (
    <InventoryContainer>
      <InventoryTitle>Inventory</InventoryTitle>
      {inventory.length === 0 ? 
        <InventorySubTitle>No Inventory to display.</InventorySubTitle>
      :
        <InventoryTable>
          <InventoryTableHead>
              <InventoryTableRow>
                <InventoryTableHeadData>
                  Category
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Name
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Quantity
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Price
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Time
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Parents
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Profile
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Sex
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Image
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Date Added
                </InventoryTableHeadData>
              </InventoryTableRow>
            </InventoryTableHead>
            <InventoryTableBody>
              {inventory.map((inventory, index) => {
                const formattedDate = new Date(inventory.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                return (
                  <InventoryTableRow key={index}>
                    <InventoryTableData>
                    { inventory.categoryId }
                    </InventoryTableData>
                    <InventoryTableData>
                    { inventory.name }
                    </InventoryTableData>
                    <InventoryTableData>
                    { inventory.quantity }
                    </InventoryTableData>
                    <InventoryTableData>
                    { inventory.price }
                    </InventoryTableData>
                    <InventoryTableData>
                    { inventory.time }
                    </InventoryTableData>
                    <InventoryTableData>
                    { inventory.mother } x { inventory.father }
                    </InventoryTableData>
                    <InventoryTableData>
                    { inventory.profile }
                    </InventoryTableData>
                    <InventoryTableData>
                    { inventory.sex }
                    </InventoryTableData>
                    <InventoryTableData>
                    { inventory.image ? inventory.image : 'N/A' }
                    </InventoryTableData>
                    <InventoryTableData>
                    { formattedDate }
                    </InventoryTableData>
                  </InventoryTableRow>
                )
              })}
            </InventoryTableBody>
        </InventoryTable>
      }
    </InventoryContainer>
  );
}

export default Inventory;