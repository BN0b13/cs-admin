import { useContext, useEffect, useState } from 'react';

import Button from '../../../../components/reusable/button/button.component';
import Company from '../../../../components/company/company.component';
import Spinner from '../../../../components/reusable/spinner/spinner.component';
import UpdateCompany from '../../../../components/company/update-company/update-company.component';

import { ToastContext } from '../../../../contexts/toast.context';

import Client from '../../../../tools/client';

import {
    ContentContainer,
    Input,
    MainContainer,
    Text,
    Textarea
} from '../../../../styles/page.styles';

const client = new Client();

const ContributorCompanyPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ company, setCompany ] = useState([]);
    const [ showUpdate, setShowUpdate ] = useState(false);
    const [ companyName, setCompanyName ] = useState('');
    const [ companyBio, setCompanyBio ] = useState('');

    const { errorToast } = useContext(ToastContext);

    useEffect(() => {
        getCompany();
    }, []);

    const getCompany = async () => {
        setLoading(true);
        const res = await client.getCompany();
        setCompany(res.rows[0]);
        setLoading(false);
    }

    const createCompany = async () => {
        if(companyName === '' ||
            companyBio === '') {
                errorToast('Please fill out all fields to create your company.');
            return
        }

        setLoading(true);

        const data = {
            name: companyName,
            bio: companyBio
        };

        await client.createContributorCompany(data);

        await getCompany();
    }

    return (
        <MainContainer>
            <ContentContainer>
                {loading ?
                    <Spinner />
                :
                    !company ?
                        <>
                            <Input type={'text'} value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder={'Company Name'} />
                            <Textarea type={'text'} value={companyBio} onChange={(e) => setCompanyBio(e.target.value)} placeholder={'Company Name'} />
                            <Button onClick={() => createCompany()}>Create Company</Button>
                        </>
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