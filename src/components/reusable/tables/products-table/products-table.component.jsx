import {
  FaAngleUp,
  FaAngleDown
} from 'react-icons/fa';

import { url } from '../../../../config';

import {
  ColumnContainer,
  Subtitle,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow
} from '../../../../styles/component.styles';

const ProductsTable = ({ products, setSort = () => {}, currentSort = {}  }) => {

    return (
      <ColumnContainer>
        {products.length === 0 ? 
          <Subtitle>No Products to display.</Subtitle>
        :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => setSort('name')} cursor={'pointer'}>
                  <ColumnContainer flexDirection={'row'}>
                      Name
                      <ColumnContainer minHeight={'1em'} minWidth={'1em'}>
                        {currentSort.column === 'name' ? 
                            currentSort.direction === 'descending' ? 
                              <FaAngleUp /> 
                            : 
                              <FaAngleDown /> 
                            : 
                              ''
                        }
                      </ColumnContainer>
                  </ColumnContainer>
                </TableHead>
                <TableHead>
                  Category
                </TableHead>
                <TableHead onClick={() => setSort('description')} cursor={'pointer'}>
                  <ColumnContainer flexDirection={'row'}>
                      Description
                      <ColumnContainer minHeight={'1em'} minWidth={'1em'}>
                        {currentSort.column === 'description' ? 
                            currentSort.direction === 'descending' ? 
                              <FaAngleUp /> 
                            : 
                              <FaAngleDown /> 
                            : 
                              ''
                        }
                      </ColumnContainer>
                  </ColumnContainer>
                </TableHead>
                <TableHead onClick={() => setSort('createdAt')} cursor={'pointer'}>
                  <ColumnContainer flexDirection={'row'}>
                      Date Added
                      <ColumnContainer minHeight={'1em'} minWidth={'1em'}>
                        {currentSort.column === 'createdAt' ? 
                            currentSort.direction === 'descending' ? 
                              <FaAngleUp /> 
                            : 
                              <FaAngleDown /> 
                            : 
                              ''
                        }
                      </ColumnContainer>
                  </ColumnContainer>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => {
                const formattedDate = new Date(product.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});

                return (
                  <TableRow key={index}>
                    <TableData>
                    <a href={`${url}/products/${product.id}`}>
                    { product.name }
                    </a>
                    </TableData>
                    <TableData>
                    <a href={`${url}/categories/${product?.Category?.id || product['Category.id']}`}>
                    { product?.Category?.name || product['Category.name']}
                    </a>
                    </TableData>
                    <TableData>
                    { product.description }
                    </TableData>
                    <TableData>
                    { formattedDate }
                    </TableData>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        }
      </ColumnContainer>
    );
}

export default ProductsTable;