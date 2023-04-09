import React, { useEffect, useState } from 'react';

import Spinner from '../spinner/spinner.component';

import Client from '../../tools/client';

import {
  ProductsContainer,
  ProductsTable,
  ProductsTableBody,
  ProductsTableData,
  ProductsTableHead,
  ProductsTableHeadData,
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
            <ProductsTableHead>
                <ProductsTableRow>
                  <ProductsTableHeadData>
                    Category
                  </ProductsTableHeadData>
                  <ProductsTableHeadData>
                    Name
                  </ProductsTableHeadData>
                  <ProductsTableHeadData>
                    Description
                  </ProductsTableHeadData>
                  <ProductsTableHeadData>
                    Price
                  </ProductsTableHeadData>
                  <ProductsTableHeadData>
                    Time
                  </ProductsTableHeadData>
                  <ProductsTableHeadData>
                    Parents
                  </ProductsTableHeadData>
                  <ProductsTableHeadData>
                    Profile
                  </ProductsTableHeadData>
                  <ProductsTableHeadData>
                    Sex
                  </ProductsTableHeadData>
                  <ProductsTableHeadData>
                    Image
                  </ProductsTableHeadData>
                  <ProductsTableHeadData>
                    Date Added
                  </ProductsTableHeadData>
                </ProductsTableRow>
              </ProductsTableHead>
              <ProductsTableBody>
                {products.map((product, index) => {
                  const formattedDate = new Date(product.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                  return (
                    <ProductsTableRow key={index}>
                      <ProductsTableData>
                      { product.categoryId }
                      </ProductsTableData>
                      <ProductsTableData>
                      { product.name }
                      </ProductsTableData>
                      <ProductsTableData>
                      { product.description }
                      </ProductsTableData>
                      <ProductsTableData>
                      { product.price }
                      </ProductsTableData>
                      <ProductsTableData>
                      { product.time }
                      </ProductsTableData>
                      <ProductsTableData>
                      { product.mother } x { product.father }
                      </ProductsTableData>
                      <ProductsTableData>
                      { product.profile }
                      </ProductsTableData>
                      <ProductsTableData>
                      { product.sex }
                      </ProductsTableData>
                      <ProductsTableData>
                      { product.image ? product.image : 'N/A' }
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