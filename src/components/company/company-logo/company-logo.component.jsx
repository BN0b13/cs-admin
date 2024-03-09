import { useState } from 'react';

import Spinner from '../../reusable/spinner/spinner.component';

import { api } from '../../../config';
import Client from '../../../tools/client';

import {
    Logo,
    MainContainer
} from '../../../styles/component.styles';

const client = new Client();

const CompanyLogo = ({ company, getCompany }) => {
    const [ loading, setLoading ] = useState(false);
    const deleteLogo = async (id) => {
        setLoading(true);
        const data = {
            id
        };
        await client.deleteCompanyLogo(data);
        await getCompany();
        setLoading(false);
    }
    
    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <Logo src={api + company.logoPath} alt='Company Logo' />
                    <button onClick={() => deleteLogo(company.id)}>Delete Logo</button>
                </>
            }
        </MainContainer>
    )
};

export default CompanyLogo;