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

const CategoriesTable = ({ companies }) => {

    return (
        <ColumnContainer>
            {companies.length === 0 ? 
             <Subtitle>No Companies to display</Subtitle>
            :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Bio</TableHead>
                            <TableHead>Active</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {companies.map((company, index) => (
                            <TableRow key={index} onClick={() => window.location = `${url}/companies/${company.id}`} cursor={'pointer'}>
                                <TableData>{company.name || 'Company Not Set Up'}</TableData>
                                <TableData>{company.bio}</TableData>
                                <TableData>{company.active ? 'Yes' : 'No'}</TableData>
                            </TableRow>
                    ))}
                    </TableBody>
                </Table>
            }
        </ColumnContainer>
    )
}

export default CategoriesTable;