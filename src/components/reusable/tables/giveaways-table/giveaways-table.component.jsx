import { url } from '../../../../config';

import { 
    MainContainer,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableData,
    Text
} from '../../../../styles/component.styles';

const GiveawaysTable = ({giveaways}) => {

    return (
        <MainContainer>
            {giveaways.length === 0 ?
                <Text>No Giveaways</Text>
            :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date Created</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {giveaways.map((giveaway, index) => {
                        const formattedDate = new Date(giveaway.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
                        return (
                            <TableRow key={index} onClick={() => window.location = `${url}/giveaways/${giveaway.id}`} cursor={'pointer'}>
                                <TableData>{ giveaway.name }</TableData>
                                <TableData>{ giveaway.type }</TableData>
                                <TableData>{ giveaway.status }</TableData>
                                <TableData>{ formattedDate }</TableData>
                            </TableRow>
                    )})}
                    </TableBody>
                </Table>
            }
        </MainContainer>
    )
}

export default GiveawaysTable;