import React, { useEffect, useState } from 'react';

import Spinner from '../spinner/spinner.component';

import Client from '../../tools/client';

import {
  ProductsContainer,
  ProductsTable,
  ProductsTableBody,
  ProductsTableData,
  ProductsTableHead,
  ProductsTableHeader,
  ProductsTableRow,
  ProductsSubTitle,
  ProductsTitle
} from './products.styles';

const client = new Client();

const Products = () => {
  const [ products, setProducts ] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const res = await client.getProducts();
      setProducts(res.rows);
    }

    getProducts();
  }, []);

  if(!products) {
    return (
      <Spinner />
    );
  }

    return (
      <ProductsContainer>
        <ProductsTitle>Products</ProductsTitle>
        {products.length === 0 ? 
          <ProductsSubTitle>No Products to display.</ProductsSubTitle>
        :
          <ProductsTable>
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
                    { product.name }
                    </ProductsTableData>
                    <ProductsTableData>
                    { product.Category.name }
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
          </ProductsTable>
        }
      </ProductsContainer>
    );
}

export default Products;