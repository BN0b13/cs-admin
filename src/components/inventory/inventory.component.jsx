import React, { useEffect, useState } from 'react';

import Spinner from '../reusable/spinner/spinner.component';

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

const Inventory = ({ inventory }) => {

  return (
    <InventoryContainer>
      <InventoryTitle>Inventory</InventoryTitle>
      {inventory === '' || inventory == undefined ? 
        <InventorySubTitle>No Inventory to display.</InventorySubTitle>
      :
        <InventoryTable>
          <InventoryTableHead>
              <InventoryTableRow>
                <InventoryTableHeadData>
                  Size
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Size Description
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Quantity
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Price
                </InventoryTableHeadData>
                <InventoryTableHeadData>
                  Created At
                </InventoryTableHeadData>
              </InventoryTableRow>
            </InventoryTableHead>
            <InventoryTableBody>
              {inventory.map((inventory, index) => {
                const formattedDate = new Date(inventory.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                return (
                  <InventoryTableRow key={index}>
                    <InventoryTableData>
                    { inventory.size }
                    </InventoryTableData>
                    <InventoryTableData>
                    { inventory.sizeDescription }
                    </InventoryTableData>
                    <InventoryTableData>
                    { inventory.quantity }
                    </InventoryTableData>
                    <InventoryTableData>
                    { inventory.price }
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