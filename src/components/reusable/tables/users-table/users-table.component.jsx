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

const UsersTable = ({ 
    users = [],
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
            {users.length === 0 ? 
                <Subtitle>No Users to display.</Subtitle>
            :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('email')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Email
                                        {sortKey === 'email' && sortDirection === 'ASC' ?
                                                <FaAngleUp />
                                            :
                                                sortKey === 'email' && sortDirection === 'DESC' ?
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
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('username')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Username
                                    {sortKey === 'username' && sortDirection === 'ASC' ?
                                            <FaAngleUp />
                                        :
                                            sortKey === 'username' && sortDirection === 'DESC' ?
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
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('firstName')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Name
                                    {sortKey === 'firstName' && sortDirection === 'ASC' ?
                                            <FaAngleUp />
                                        :
                                            sortKey === 'firstName' && sortDirection === 'DESC' ?
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
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('createdAt')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Join Date
                                    {sortKey === 'createdAt' && sortDirection === 'ASC' ?
                                            <FaAngleUp />
                                        :
                                            sortKey === 'createdAt' && sortDirection === 'DESC' ?
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
                    {users.map((user, index) => {
                        const formattedDate = new Date(user.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
                        
                        return (
                            <TableRow key={index} onClick={() => window.location = `${url}/accounts/${user.id}`} cursor={'pointer'}>
                                <TableData>{user.email}</TableData>
                                <TableData>{user.username}</TableData>
                                <TableData>{user.firstName} {user.lastName}</TableData>
                                <TableData>{formattedDate}</TableData>
                            </TableRow>
                    )})}
                    </TableBody>
                </Table>
            }
        </ColumnContainer>
)};

export default UsersTable;