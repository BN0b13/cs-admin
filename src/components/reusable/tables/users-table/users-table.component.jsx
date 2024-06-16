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

const UsersTable = ({ users, setSort = () => {}, currentSort = {} }) => (
        <ColumnContainer>
            {users.length === 0 ? 
                <Subtitle>No Users to display.</Subtitle>
            :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead onClick={() => setSort('email')} cursor={'pointer'}>
                                <ColumnContainer flexDirection={'row'}>
                                    Email
                                    <ColumnContainer minHeight={'1em'} minWidth={'1em'}>
                                        {currentSort.column === 'email' ? 
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
                            <TableHead onClick={() => setSort('username')} cursor={'pointer'}>
                                <ColumnContainer flexDirection={'row'}>
                                    Username
                                    <ColumnContainer minHeight={'1em'} minWidth={'1em'}>
                                        {currentSort.column === 'username' ? 
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
                            <TableHead onClick={() => setSort('firstName')} cursor={'pointer'}>
                                <ColumnContainer flexDirection={'row'}>
                                    Name
                                    <ColumnContainer minHeight={'1em'} minWidth={'1em'}>
                                        {currentSort.column === 'firstName' ? 
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
                                    Join Date
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
);

export default UsersTable;