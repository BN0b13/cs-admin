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

const CategoriesTable = ({ 
    companies = [],
    sortKey = '',
    setSortKey = () => {},
    sortDirection = '',
    setSortDirection = () => {},
    reloadTable = async () => {}}) => {

    const sortColumn = async (key) => {
        if(key === sortKey) {
            if(sortDirection === 'ASC') {
                setSortDirection('DESC');
                
                return await reloadTable(true);
            }

            if(sortDirection === 'DESC') {
                setSortDirection('');
                
                return await reloadTable(true);
            }
            
            setSortDirection('ASC');

            return await reloadTable(true);
        } else {
            setSortKey(key);
            setSortDirection('ASC');

            return await reloadTable(true);
        }
    }

    return (
        <ColumnContainer>
            {companies.length === 0 ? 
             <Subtitle>No Companies to display</Subtitle>
            :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('name')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Name
                                        {sortKey === 'name' && sortDirection === 'ASC' ?
                                                <FaAngleUp />
                                            :
                                                sortKey === 'name' && sortDirection === 'DESC' ?
                                                    <FaAngleDown />
                                                :
                                                    <ColumnContainer 
                                                        minHeight={'1em'} 
                                                        minWidth={'1em'}
                                                    >
                                                    </ColumnContainer>
                                        }
                                </ColumnContainer>
                            </TableHead>
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('bio')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Bio
                                        {sortKey === 'bio' && sortDirection === 'ASC' ?
                                                <FaAngleUp />
                                            :
                                                sortKey === 'bio' && sortDirection === 'DESC' ?
                                                    <FaAngleDown />
                                                :
                                                    <ColumnContainer 
                                                        minHeight={'1em'} 
                                                        minWidth={'1em'}
                                                    >
                                                    </ColumnContainer>
                                        }
                                </ColumnContainer>
                            </TableHead>
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('active')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Active
                                        {sortKey === 'active' && sortDirection === 'ASC' ?
                                                <FaAngleUp />
                                            :
                                                sortKey === 'active' && sortDirection === 'DESC' ?
                                                    <FaAngleDown />
                                                :
                                                    <ColumnContainer 
                                                        minHeight={'1em'} 
                                                        minWidth={'1em'}
                                                    >
                                                    </ColumnContainer>
                                        }
                                </ColumnContainer>
                            </TableHead>
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