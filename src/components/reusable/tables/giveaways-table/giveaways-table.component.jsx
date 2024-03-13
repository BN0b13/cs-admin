import { url } from '../../../../config';

import { 
    MainContainer,
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableDataLink,
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
                            <TableRow key={index} onClick={() => window.location = `${url}/giveaways/${giveaway.id}`}>
                                <TableDataLink>{ giveaway.name }</TableDataLink>
                                <TableDataLink>{ giveaway.type }</TableDataLink>
                                <TableDataLink>{ giveaway.status }</TableDataLink>
                                <TableDataLink>{ formattedDate }</TableDataLink>
                            </TableRow>
                    )})}
                    </TableBody>
                </Table>
            }
        </MainContainer>
    )
}

export default GiveawaysTable;