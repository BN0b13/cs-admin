import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Giveaway from '../../components/giveaway/giveaway.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UpdateGiveaway from '../../components/giveaway/update-giveaway/update-giveaway.component';

import Client from '../../tools/client';

import {
    BackLink,
    ContentContainer,
    MainContainer,
    MainTitle,
    Text
} from '../../styles/page.styles';

const client = new Client();

const GiveawayPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ giveaway, setGiveaway ] = useState('');
    const [ showUpdate, setShowUpdate ] = useState(false);

    useEffect(() => {
        getGiveaway();
    }, []);

    const getGiveaway = async () => {
        setLoading(true);
        const res = await client.getGiveawayById(id);

        if(!res.error) {
            setGiveaway(res);
        }
        setLoading(false);
    }

    return (
        <MainContainer>
            <BackLink onClick={() => window.location = '/giveaways'}>Back to Giveaways</BackLink>
            <ContentContainer>
            {loading ?
                <Spinner />
            :
                !giveaway ?
                    <Text>Giveaway does not exist</Text>
                :
                    showUpdate ?
                        <UpdateGiveaway giveaway={giveaway} getGiveaway={getGiveaway} setShowUpdate={setShowUpdate} />
                    :
                        <Giveaway giveaway={giveaway} getGiveaway={getGiveaway} setShowUpdate={setShowUpdate} />
            }
            </ContentContainer>
        </MainContainer>
    )
}

export default GiveawayPage;