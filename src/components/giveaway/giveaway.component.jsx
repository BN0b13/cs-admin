import Button from '../reusable/button/button.component';

import Client from '../../tools/client';

import {
    MainContainer,
    Text,
    Title
} from '../../styles/component.styles';

const client = new Client();

const Giveaway = ({ giveaway, getGiveaway, setShowUpdate }) => {

    const changeManualGiveawayStatus = async () => {
        const data = {
            id: giveaway.id,
        };

        if(giveaway.status === 'created') {
            data.status = 'active';
        }

        if(giveaway.status === 'active') {
            data.status = 'completed';
        }

        const res = await client.updateGiveaway(data);

        await getGiveaway();
    }

    return (
        <MainContainer>
            <Title>Giveaway</Title>
            <Text>Status: { giveaway.status }</Text>
            <Text>Type: { giveaway.type }</Text>
            <Text>Name: { giveaway.name }</Text>
            <Text>Description: { giveaway.description }</Text>
            <Text>Rules:</Text>
            {!giveaway.rules ?
                <Text>No Rules associated with Giveaway</Text>
            :
                giveaway.rules.map((rule, index) => (
                    <Text key={index}>{ index + 1 }. { rule.rule }</Text>
                ))
            }
            <Text>Prizes: </Text>
            {giveaway.prizes.map((prize, index) => (
                <Text key={index}>{ index + 1 }. { prize.prize }</Text>
            ))}

            {giveaway.type === 'manual' && (giveaway.status === 'created' || giveaway.status === 'active') &&
                <Button onClick={() => changeManualGiveawayStatus()}>{giveaway.status == 'created' ? 'Start' : 'End'} Giveaway</Button>
            }

            {giveaway.status === 'created' &&
                <Button onClick={() => setShowUpdate(true)}>Update Giveaway</Button>
            }
        </MainContainer>
    )
}

export default Giveaway;