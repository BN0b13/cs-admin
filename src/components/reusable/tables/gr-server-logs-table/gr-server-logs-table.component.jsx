import {
    FaAngleUp,
    FaAngleDown
} from 'react-icons/fa';

import { RiDeleteBinLine } from "react-icons/ri";

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

const GRServerLogsTable = ({ 
    logs = [],
    deleteLog = async () => {},
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
            {logs.length === 0 ? 
                <Subtitle>No Logs to display.</Subtitle>
            :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('type')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Type
                                        {sortKey === 'type' && sortDirection === 'ASC' ?
                                                <FaAngleUp />
                                            :
                                                sortKey === 'type' && sortDirection === 'DESC' ?
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
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('duration')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Duration
                                    {sortKey === 'duration' && sortDirection === 'ASC' ?
                                            <FaAngleUp />
                                        :
                                            sortKey === 'duration' && sortDirection === 'DESC' ?
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
                            <TableHead cursor={'pointer'}>
                                <ColumnContainer flexDirection={'row'}>
                                    PH
                                    <ColumnContainer 
                                        minHeight={'1em'} 
                                        minWidth={'1em'}
                                    >
                                    </ColumnContainer>
                                </ColumnContainer>
                            </TableHead>
                            <TableHead cursor={'pointer'}>
                                <ColumnContainer flexDirection={'row'}>
                                    PPM
                                    <ColumnContainer 
                                        minHeight={'1em'} 
                                        minWidth={'1em'}
                                    >
                                    </ColumnContainer>
                                </ColumnContainer>
                            </TableHead>
                            <TableHead cursor={'pointer'}>
                                <ColumnContainer flexDirection={'row'}>
                                    Temperature
                                    <ColumnContainer 
                                        minHeight={'1em'} 
                                        minWidth={'1em'}
                                    >
                                    </ColumnContainer>
                                </ColumnContainer>
                            </TableHead>
                            <TableHead cursor={'pointer'} onClick={() => sortColumn('createdAt')}>
                                <ColumnContainer flexDirection={'row'}>
                                    Date
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
                            <TableHead cursor={'pointer'}>
                                <ColumnContainer flexDirection={'row'}>
                                    Delete Log
                                    <ColumnContainer 
                                        minHeight={'1em'} 
                                        minWidth={'1em'}
                                    >
                                    </ColumnContainer>
                                </ColumnContainer>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {logs.map((log, index) => {
                        const formattedDate = new Date(log.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
                        
                        return (
                            <TableRow key={index} cursor={'pointer'}>
                                <TableData>{log.type}</TableData>
                                <TableData>{log.duration}</TableData>
                                <TableData>{log.notes.ph}</TableData>
                                <TableData>{log.notes.ppm}</TableData>
                                <TableData>{log.notes.temperature}</TableData>
                                <TableData>{formattedDate}</TableData>
                                <TableData>
                                    <ColumnContainer>
                                        <RiDeleteBinLine onClick={() => deleteLog(log.id)} />
                                    </ColumnContainer>
                                </TableData>
                            </TableRow>
                    )})}
                    </TableBody>
                </Table>
            }
        </ColumnContainer>
)};

export default GRServerLogsTable;