import { useContext, useEffect, useState } from 'react';

import Button from '../../reusable/button/button.component';

import { ToastContext } from '../../../contexts/toast.context';

import Client from '../../../tools/client';
import { setMobileView } from '../../../tools/mobileView';

import {
    Input,
    MainContainer,
    RowContainer,
    SmallButton,
    Subtitle,
    Textarea,
    Title
} from '../../../styles/component.styles';

const client = new Client();

const UpdateCompany = ({ company, getCompany, setShowUpdate }) => {
    const [ name, setName ] = useState(company.name || '');
    const [ bio, setBio ] = useState(company.bio || '');
    const [ url, setUrl ] = useState(company.url || '');
    const [ discord, setDiscord ] = useState('');
    const [ displayDiscord, setDisplayDiscord ] = useState(false);
    const [ facebook, setFacebook ] = useState('');
    const [ displayFacebook, setDisplayFacebook ] = useState(false);
    const [ instagram, setInstagram ] = useState('');
    const [ displayInstagram, setDisplayInstagram ] = useState(false);
    const [ linkedIn, setLinkedIn ] = useState('');
    const [ displayLinkedIn, setDisplayLinkedIn ] = useState(false);
    const [ reddit, setReddit ] = useState('');
    const [ displayReddit, setDisplayReddit ] = useState(false);
    const [ twitter, setTwitter ] = useState('');
    const [ displayTwitter, setDisplayTwitter ] = useState(false);
    
    const { errorToast } = useContext(ToastContext);

    useEffect(() => {
        if(company.socials) {
            setDiscord(company?.socials[0]?.discord?.url);
            setDisplayDiscord(company?.socials[0]?.discord?.display);
            setFacebook(company?.socials[0]?.facebook?.url);
            setDisplayFacebook(company?.socials[0]?.facebook?.display);
            setInstagram(company?.socials[0]?.instagram?.url);
            setDisplayInstagram(company?.socials[0]?.instagram?.display);
            setLinkedIn(company?.socials[0]?.linkedIn?.url);
            setDisplayLinkedIn(company?.socials[0]?.linkedIn?.display);
            setReddit(company?.socials[0]?.reddit?.url);
            setDisplayReddit(company?.socials[0]?.reddit?.display);
            setTwitter(company?.socials[0]?.twitter?.url);
            setDisplayTwitter(company?.socials[0]?.twitter?.display );
        }

        // eslint-disable-next-line
    }, []);

    const switchSocialButton = (name, input, setInput) => {
        if(input === '') {
            errorToast(`${name} needs a url before you can activate it.`);
            return
        }

        setInput(!input);
    }

    const changeView = () => {
        window.scrollTo(0, 0);
        setShowUpdate(false);
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
            socials: [{
                discord: {
                    url: discord,
                    display: discord !== '' ? displayDiscord : false
                },
                facebook: {
                    url: facebook,
                    display: facebook !== '' ? displayFacebook : false
                },
                instagram: {
                    url: instagram,
                    display: instagram !== '' ? displayInstagram : false
                },
                linkedIn: {
                    url: linkedIn,
                    display: linkedIn !== '' ? displayLinkedIn : false
                },
                reddit: {
                    url: reddit,
                    display: reddit !== '' ? displayReddit : false
                },
                twitter: {
                    url: twitter,
                    display: twitter !== '' ? displayTwitter : false
                }
            }]
        }

        await client.updateCompany(data);
        await getCompany();
        setShowUpdate(false);
    }

    return (
        <MainContainer>
            <Title>Update Company</Title>
            <Subtitle>Name</Subtitle>
            <RowContainer margin={'10px 0'}>
                <Input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name'  />
            </RowContainer>
            <Subtitle>Bio</Subtitle>
            <RowContainer margin={'10px 0'}>
                <Textarea name='bio' value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Bio' />
            </RowContainer>
            <Subtitle>Company URL</Subtitle>
            <RowContainer margin={'10px 0'}>
                <Input type='text' name='url' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='URL' />
            </RowContainer>
            <Subtitle>Socials</Subtitle>
            <RowContainer margin={'10px 0'} flexDirection={setMobileView() ? 'column' : 'row'}>
                <Input type='text' name='discord' value={discord} onChange={(e) => setDiscord(e.target.value)} placeholder='Discord' />
                <SmallButton onClick={() => switchSocialButton('Discord', displayDiscord, setDisplayDiscord)}>{ displayDiscord ? 'On' : 'Off'}</SmallButton>
            </RowContainer>
            <RowContainer margin={'10px 0'} flexDirection={setMobileView() ? 'column' : 'row'}>
                <Input type='text' name='facebook' value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder='Facebook' />
                <SmallButton onClick={() => switchSocialButton('Facebook', displayFacebook, setDisplayFacebook)}>{ displayFacebook ? 'On' : 'Off'}</SmallButton>
            </RowContainer>
            <RowContainer margin={'10px 0'} flexDirection={setMobileView() ? 'column' : 'row'}>
                <Input type='text' name='instagram' value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder='Instagram' />
                <SmallButton onClick={() => switchSocialButton('Instagram', displayInstagram, setDisplayInstagram)}>{ displayInstagram ? 'On' : 'Off'}</SmallButton>
            </RowContainer>
            <RowContainer margin={'10px 0'} flexDirection={setMobileView() ? 'column' : 'row'}>
                <Input type='text' name='linkedIn' value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} placeholder='LinkedIn' />
                <SmallButton onClick={() => switchSocialButton('LinkedIn', displayLinkedIn, setDisplayLinkedIn)}>{ displayLinkedIn ? 'On' : 'Off'}</SmallButton>
            </RowContainer>
            <RowContainer margin={'10px 0'} flexDirection={setMobileView() ? 'column' : 'row'}>
                <Input type='text' name='reddit' value={reddit} onChange={(e) => setReddit(e.target.value)} placeholder='Reddit' />
                <SmallButton onClick={() => switchSocialButton('Reddit', displayReddit, setDisplayReddit)}>{ displayReddit ? 'On' : 'Off'}</SmallButton>
            </RowContainer>
            <RowContainer margin={'10px 0'} flexDirection={setMobileView() ? 'column' : 'row'}>
                <Input type='text' name='twitter' value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder='Twitter' />
                <SmallButton onClick={() => switchSocialButton('Twitter', displayTwitter, setDisplayTwitter)}>{ displayTwitter ? 'On' : 'Off'}</SmallButton>
            </RowContainer>
            <RowContainer margin={'20px 0'}>
                <Button onClick={() => changeView()}>Cancel</Button>
                <Button onClick={() => updateCompany()}>Submit</Button>
            </RowContainer>
        </MainContainer>
    )
}

export default UpdateCompany;