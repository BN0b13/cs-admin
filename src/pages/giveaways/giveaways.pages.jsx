import { useEffect, useState } from 'react';

import AddGiveaway from '../../components/giveaway/add-giveaway/add-giveaway.component';
import Button from '../../components/reusable/button/button.component';
import GiveawaysTable from '../../components/reusable/tables/giveaways-table/giveaways-table.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    ContentContainer,
    MainContainer,
    MainTitle
} from '../../styles/page.styles';

const client = new Client();

const GiveawaysPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ giveaways, setGiveaways ] = useState([]);
    const [ showAddGiveaway, setShowAddGiveaway ] = useState(false);

    useEffect(() => {
        getGiveaways();
    }, []);

    const getGiveaways = async () => {
        setLoading(true);
        const res = await client.getGiveaways();
        setGiveaways(res.rows);
        setLoading(false);
    }

    return (
        <MainContainer>
            <ContentContainer>
            {loading ?
                <Spinner />
            :
                showAddGiveaway ?
                    <AddGiveaway setShowAddGiveaway={setShowAddGiveaway} />
                :
                    <>
                        <Button onClick={() => setShowAddGiveaway(true)}>New Giveaway</Button>
                        <GiveawaysTable giveaways={giveaways} />
                    </>
            }
            </ContentContainer>
        </MainContainer>
    )
}

export default GiveawaysPage;