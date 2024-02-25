import { useState } from 'react';

import Button from '../reusable/button/button.component';

import Client from '../../tools/client';

import {
    MainContainer,
    GiveawayInput,
    GiveawayTable,
    GiveawayTableBody,
    GiveawayTableHead,
    GiveawayTableHeader,
    GiveawayTableRow,
    GiveawayTableData
} from './giveaway.styles';

const client = new Client();

const Giveaway = () => {
    const [amount, setAmount] = useState(0);
    const [giveawayResults, setGiveawayResults] = useState([]);

    const getGiveawayResults = async () => {
        if(amount <= 0) {
            return
        }
        const res = await client.getGiveawaySignUp(amount);

        setGiveawayResults(res.users);
    }

    return (
        <MainContainer>
            {giveawayResults.length === 0 &&
            <>
                <GiveawayInput>
                    <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </GiveawayInput>
                <GiveawayInput>
                    <Button onClick={() => getGiveawayResults()}>Get Results</Button>
                </GiveawayInput>
            </>}

            <GiveawayTable>
                <GiveawayTableHeader>
                    <GiveawayTableRow>
                        <GiveawayTableHead>Email</GiveawayTableHead>
                        <GiveawayTableHead>Name</GiveawayTableHead>
                        <GiveawayTableHead>Created</GiveawayTableHead>
                    </GiveawayTableRow>
                </GiveawayTableHeader>
                <GiveawayTableBody>
                {giveawayResults.length > 0 &&
                    giveawayResults.map((result, index) => {
                        const formattedDate = new Date(result.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"});
                        console.log('Giveaway result: ', result);

                        return (
                            <GiveawayTableRow key={index}>
                                <GiveawayTableData>{ result.email }</GiveawayTableData>
                                <GiveawayTableData>{ result.firstName } {result.lastName}</GiveawayTableData>
                                <GiveawayTableData>{formattedDate}</GiveawayTableData>
                            </GiveawayTableRow>
                    )})
                }
                </GiveawayTableBody>
            </GiveawayTable>
        </MainContainer>
    )
}

export default Giveaway;