import { useState } from 'react';

import Button from '../../reusable/button/button.component';
import Toasted from '../../reusable/toasted/toasted.component';

import Client from '../../../tools/client';

import {
    Input,
    MainContainer,
    RowContainer,
    Textarea,
    Title
} from '../../../styles/component.styles';

const client = new Client();

const UpdateCompany = ({ company, getCompany, setShowUpdate }) => {
    const [ name, setName ] = useState(company.name || '');
    const [ bio, setBio ] = useState(company.bio || '');
    const [ url, setUrl ] = useState(company.url || '');
    const [ discord, setDiscord ] = useState(company?.socials?.discord || '');
    const [ facebook, setFacebook ] = useState(company?.socials?.facebook || '');
    const [ instagram, setInstagram ] = useState(company?.socials?.instagram || '');
    const [ linkedIn, setLinkedIn ] = useState(company?.socials?.linkedin || '');
    const [ reddit, setReddit ] = useState(company?.socials?.reddit || '');
    const [ twitter, setTwitter ] = useState(company?.socials?.twitter || '');
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const getToasted = (toast) => toast();

    const errorToast = (message) => {
        setToastMessage(message);
        setToastError(true);
        setShowToast(true);
    }

    const updateCompany = async () => {
        if(name === '' ||
            bio === '') {
                errorToast('Name and Bio fields are required.');
                return
            }

        const data = {
            id: company.id,
            name,
            bio,
            url,
            socials: {
                discord,
                facebook,
                instagram,
                linkedIn,
                reddit,
                twitter
            }
        }

        await client.updateCompany(data);
        await getCompany();
        setShowUpdate(false);
    }

    return (
        <MainContainer>
            <Title>Update Company</Title>
            <Input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
            <Textarea name='bio' value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Bio' />
            <Input type='text' name='url' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='URL' />
            <Input type='text' name='discord' value={discord} onChange={(e) => setDiscord(e.target.value)} placeholder='Discord' />
            <Input type='text' name='facebook' value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder='Facebook' />
            <Input type='text' name='instagram' value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder='Instagram' />
            <Input type='text' name='linkedIn' value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} placeholder='LinkedIn' />
            <Input type='text' name='reddit' value={reddit} onChange={(e) => setReddit(e.target.value)} placeholder='Reddit' />
            <Input type='text' name='twitter' value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder='Twitter' />
            <RowContainer>
                <Button onClick={() => setShowUpdate(false)}>Cancel</Button>
                <Button onClick={() => updateCompany()}>Submit</Button>
            </RowContainer>
            <Toasted 
                message={toastMessage}
                showToast={showToast}
                setShowToast={setShowToast}
                getToasted={getToasted}
                error={toastError}
            />
        </MainContainer>
    )
}

export default UpdateCompany;