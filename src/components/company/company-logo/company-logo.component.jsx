import { useState } from 'react';

import Spinner from '../../reusable/spinner/spinner.component';
import AdminModal from '../../reusable/admin-modal/admin-modal.component';

import { api } from '../../../config';
import Client from '../../../tools/client';

import {
    DeleteButton,
    Logo,
    MainContainer
} from '../../../styles/component.styles';

const client = new Client();

const CompanyLogo = ({ company, getCompany }) => {
    const [ loading, setLoading ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);

    const deleteLogo = async () => {
        setLoading(true);

        const data = {
            id: company.id
        };

        await client.deleteCompanyLogo(data);
        await getCompany();
        setLoading(false);
    }
    
    return (
        <MainContainer>
            <AdminModal 
                show={showModal}
                setShow={setShowModal}
                title={'Delete Logo'} 
                image={api + company.logoPath}
                message={'Are you sure you want to delete this logo forever?'} 
                action={() => deleteLogo()} 
                actionText={'Delete'}
            />
            {loading ?
                <Spinner />
            :
                <>
                    <Logo src={api + company.logoPath} alt='Company Logo' />
                    <DeleteButton onClick={() => setShowModal(true)}>Delete Logo</DeleteButton>
                </>
            }
        </MainContainer>
    )
};

export default CompanyLogo;