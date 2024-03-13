import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Company from '../../components/company/company.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UpdateCompany from '../../components/company/update-company/update-company.component';

import { url } from '../../config';
import Client from '../../tools/client';

import {
    BackLink,
    ContentContainer,
    MainContainer,
    Text
} from '../../styles/page.styles';

const client = new Client();

const CompanyPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ company, setCompany ] = useState([]);
    const [ showUpdate, setShowUpdate ] = useState(false);

    useEffect(() => {
        getCompany();
    }, []);

    const getCompany = async () => {
        setLoading(true);
        const res = await client.getCompanyById(id);

        setCompany(res);
        setLoading(false);
    }

    return (
        <MainContainer>
            <BackLink onClick={() => window.location.href = `${url}/companies`}>Back to Companies</BackLink>
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
        </MainContainer>
    )
}

export default CompanyPage;