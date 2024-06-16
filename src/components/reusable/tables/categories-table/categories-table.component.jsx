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

const CategoriesTable = ({categories}) => {

    return (
        <ColumnContainer>
            {categories.length === 0 ?
             <Subtitle>No Categories to Display</Subtitle>
            :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {categories.map((category, index) => (
                            <TableRow key={index} onClick={() => window.location = `${url}/categories/${category.id}`} cursor={'pointer'}>
                                <TableData>{category.name}</TableData>
                                <TableData>{category.description}</TableData>
                                <TableData>{category.type}</TableData>
                            </TableRow>
                    ))}
                    </TableBody>
                </Table>
            }
        </ColumnContainer>
    )
}

export default CategoriesTable;