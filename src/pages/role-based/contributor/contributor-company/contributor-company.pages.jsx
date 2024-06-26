import { useEffect, useState } from 'react';

import Company from '../../../../components/company/company.component';
import Spinner from '../../../../components/reusable/spinner/spinner.component';
import UpdateCompany from '../../../../components/company/update-company/update-company.component';

import Client from '../../../../tools/client';

import {
    ContentContainer,
    MainContainer,
    Text
} from '../../../../styles/page.styles';

const client = new Client();

const ContributorCompanyPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ company, setCompany ] = useState([]);
    const [ showUpdate, setShowUpdate ] = useState(false);

    useEffect(() => {
        getCompany();
    }, []);

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
                    !company ?
                        <Text>Account does not have associated company. Please contact Cosmic Strains to set one up.</Text>
                    :
                        showUpdate ?
                            <UpdateCompany company={company} getCompany={getCompany} setShowUpdate={setShowUpdate} />
                        :
                            <Company company={company} getCompany={getCompany} setShowUpdate={setShowUpdate} />
                }
            </ContentContainer>
        </MainContainer>
    )
}

export default ContributorCompanyPage;