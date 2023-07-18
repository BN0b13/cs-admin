import React from 'react';

import { url } from '../../../../config';

import {
  ProductsContainer,
  ProductsMainTable,
  ProductsTableBody,
  ProductsTableData,
  ProductsTableHead,
  ProductsTableHeader,
  ProductsTableRow,
  ProductsSubTitle,
  ProductsTitle
} from './products-table.styles';

const ProductsTable = ({ products }) => {

    return (
      <ProductsContainer>
        <ProductsTitle>Products</ProductsTitle>
        {products.length === 0 ? 
          <ProductsSubTitle>No Products to display.</ProductsSubTitle>
        :
          <ProductsMainTable>
            <ProductsTableHeader>
              <ProductsTableRow>
                <ProductsTableHead>
                  Name
                </ProductsTableHead>
                <ProductsTableHead>
                  Category
                </ProductsTableHead>
                <ProductsTableHead>
                  Description
                </ProductsTableHead>
                <ProductsTableHead>
                  Date Added
                </ProductsTableHead>
              </ProductsTableRow>
            </ProductsTableHeader>
            <ProductsTableBody>
              {products.map((product, index) => {
                const formattedDate = new Date(product.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                return (
                  <ProductsTableRow key={index}>
                    <ProductsTableData>
                    <a href={`${url}/products/${product.id}`}>
                    { product.name }
                    </a>
                    </ProductsTableData>
                    <ProductsTableData>
                    <a href={`${url}/categories/${product.Category.id}`}>
                    { product.Category.name }
                    </a>
                    </ProductsTableData>
                    <ProductsTableData>
                    { product.description }
                    </ProductsTableData>
                    <ProductsTableData>
                    { formattedDate }
                    </ProductsTableData>
                  </ProductsTableRow>
                )
              })}
            </ProductsTableBody>
          </ProductsMainTable>
        }
      </ProductsContainer>
    );
}

export default ProductsTable;