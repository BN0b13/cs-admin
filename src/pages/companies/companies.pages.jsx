import { useEffect, useState } from 'react';

import CompaniesTable from '../../components/reusable/tables/compaies-table/companies-table.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    ContentContainer,
    MainContainer
} from '../../styles/page.styles';

const client = new Client();

const CompaniesPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ companies, setCompanies ] = useState([]);

    useEffect(() => {
        getCompanies();
    }, []);

    const getCompanies = async () => {
        setLoading(true);
        const res = await client.getCompanies();
        console.log('GET companies res: ', res);

        setCompanies(res.rows);
        setLoading(false);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <ContentContainer>
                    <CompaniesTable companies={companies} />
                </ContentContainer>
            }
        </MainContainer>
    )
}

export default CompaniesPage;