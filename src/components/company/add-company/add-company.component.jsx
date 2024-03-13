import { useState } from 'react';

import Button from '../../reusable/button/button.component';

import Client from '../../../tools/client';

import {
    ColumnContainer,
    MainContainer,
    Image,
    Input
} from '../../../styles/component.styles';

const client = new Client();

const AddCompany = ({ getCompany }) => {
    const [ companyName, setCompanyName ] = useState('');

    const submitCompany = async () => {

        await getCompany();
    }

    return (
        <MainContainer>
            <Input type='text' value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='Company Name' />
            <Button onClick={() => submitCompany()}>Submit</Button>
        </MainContainer>
    )
}

export default AddCompany;