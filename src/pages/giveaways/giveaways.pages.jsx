import { useEffect, useState } from 'react';

import AddGiveaway from '../../components/giveaway/add-giveaway/add-giveaway.component';
import Button from '../../components/reusable/button/button.component';
import GiveawaysTable from '../../components/reusable/tables/giveaways-table/giveaways-table.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    ContentContainer,
    MainContainer,
    MainTitle,
    Subtitle,
    Text
} from '../../styles/page.styles';

const client = new Client();

const GiveawaysPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ giveaways, setGiveaways ] = useState([]);
    const [ company, setCompany ] = useState({});
    const [ showAddGiveaway, setShowAddGiveaway ] = useState(false);

    useEffect(() => {
        getGiveaways();
        getCompany();
    }, []);

    const getGiveaways = async () => {
        setLoading(true);
        const res = await client.getGiveaways();
        setGiveaways(res.rows);
        setLoading(false);
    }

    const getCompany = async () => {
        setLoading(true);
        const res = await client.getCompanies();
        setCompany(res.rows[0]);
        setLoading(false);
    }

    return (
        <MainContainer>
            <ContentContainer>
            {loading ?
                <Spinner />
            :
                (!company.name && !company.bio) ?
                        <Subtitle>Company must have name and bio before giveaways can be created.</Subtitle>
                :
                    showAddGiveaway ?
                        <AddGiveaway setShowAddGiveaway={setShowAddGiveaway} company={company} />
                    :
                        <>
                            <MainTitle>Giveaways</MainTitle>
                            <ContentContainer>
                                <Button onClick={() => setShowAddGiveaway(true)}>New Giveaway</Button>
                            </ContentContainer>
                            <ContentContainer>
                                <GiveawaysTable giveaways={giveaways} />
                            </ContentContainer>
                        </>
            }
            </ContentContainer>
        </MainContainer>
    )
}

export default GiveawaysPage;