import {
    FaDiscord,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaRedditSquare,
    FaTwitter
} from 'react-icons/fa';

import AddCompanyLogo from './add-company-logo/add-company-logo.component';
import CompanyLogo from './company-logo/company-logo.component';
import Button from '../reusable/button/button.component';

import {
    ContentContainer,
    MainContainer,
    RowContainer,
    Subtitle,
    Text,
    Title
} from '../../styles/component.styles';

const Company = ({ company, getCompany, setShowUpdate }) => {
    const changeView = () => {
        window.scrollTo(0, 0);
        setShowUpdate(true);
    }

    return (
        <MainContainer>
            <Title>Company Details</Title>
            {!company.logoFilename ?
                <AddCompanyLogo id={company.id} getCompany={getCompany} />
            :
                <CompanyLogo  company={company} getCompany={getCompany} />
            }

            <ContentContainer>
                <RowContainer flexDirection={'column'} alignItems={'flex-start'}>
                    <RowContainer>
                        <Subtitle margin={'0 10px 0 0'}>Name:</Subtitle>
                        <Text>{ company.name || 'None' }</Text>
                    </RowContainer>
                    <RowContainer>
                        <Subtitle margin={'0 10px 0 0'}>Bio:</Subtitle>
                        <Text>{ company.bio || 'None' }</Text>
                    </RowContainer>
                    <RowContainer onClick={() => company.url ? window.open(company.url, '_blank') : ''} cursor={'pointer'} >
                        <Subtitle margin={'0 10px 0 0'}>URL:</Subtitle>
                        <Text>{ company.url || 'None' }</Text>
                    </RowContainer>
                </RowContainer>
                {company.socials === null || !company.socials ?
                    <Subtitle>Socials: None</Subtitle>
                :
                    <RowContainer flexDirection={'column'} border={'1px black solid'} margin={'20px 0'} padding={'10px'}>
                        <Subtitle margin={'5px 0'}>Discord:</Subtitle>
                        <Text margin={'5px 0'}>{ company.socials[0].discord.url || 'None' }</Text>
                        <RowContainer borderBottom={'1px black solid'} width={'100%'}>
                            <RowContainer onClick={() => window.open(company.socials[0].discord.url, '_blank')} margin={'0'} cursor={'pointer'}>
                                <FaDiscord />
                            </RowContainer>
                            <Subtitle margin={'10px'}>Giveaway Display: { company.socials[0].discord.display ? 'On' : 'Off' }</Subtitle>
                        </RowContainer>
                        <Subtitle margin={'5px 0'}>Facebook:</Subtitle>
                        <Text margin={'5px 0'}>{ company.socials[0].facebook.url || 'None' }</Text>
                        <RowContainer borderBottom={'1px black solid'} width={'100%'}>
                            <RowContainer onClick={() => window.open(company.socials[0].facebook.url, '_blank')} margin={'0'} cursor={'pointer'}>
                                <FaFacebook />
                            </RowContainer>
                            <Subtitle margin={'10px'}>Giveaway Display: { company.socials[0].facebook.display ? 'On' : 'Off' }</Subtitle>
                        </RowContainer>
                        <Subtitle margin={'5px 0'}>Instagram:</Subtitle>
                        <Text margin={'5px 0'}>{ company.socials[0].instagram.url || 'None' }</Text>
                        <RowContainer borderBottom={'1px black solid'} width={'100%'}>
                            <RowContainer onClick={() => window.open(company.socials[0].instagram.url, '_blank')} margin={'0'} cursor={'pointer'}>
                                <FaInstagram />
                            </RowContainer>
                            <Subtitle margin={'10px'}>Giveaway Display: { company.socials[0].instagram.display ? 'On' : 'Off' }</Subtitle>
                        </RowContainer>
                        <Subtitle margin={'5px 0'}>LinkedIn:</Subtitle>
                        <Text margin={'5px 0'}>{ company.socials[0].linkedIn.url || 'None' }</Text>
                        <RowContainer borderBottom={'1px black solid'} width={'100%'}>
                            <RowContainer onClick={() => window.open(company.socials[0].linkedIn.url, '_blank')} margin={'0'} cursor={'pointer'}>
                                <FaLinkedin />
                            </RowContainer>
                            <Subtitle margin={'10px'}>Giveaway Display: { company.socials[0].linkedIn.display ? 'On' : 'Off' }</Subtitle>
                        </RowContainer>
                        <Subtitle margin={'5px 0'}>Reddit:</Subtitle>
                        <Text margin={'5px 0'}>{ company.socials[0].reddit.url || 'None' }</Text>
                        <RowContainer borderBottom={'1px black solid'} width={'100%'}>
                            <RowContainer onClick={() => window.open(company.socials[0].reddit.url, '_blank')} margin={'0'} cursor={'pointer'}>
                                <FaRedditSquare />
                            </RowContainer>
                            <Subtitle margin={'10px'}>Giveaway Display: { company.socials[0].reddit.display ? 'On' : 'Off' }</Subtitle>
                        </RowContainer>
                        <Subtitle margin={'5px 0'}>Twitter:</Subtitle>
                        <Text margin={'5px 0'}>{ company.socials[0].twitter.url || 'None' }</Text>
                        <RowContainer width={'100%'}>
                            <RowContainer onClick={() => window.open(company.socials[0].twitter.url, '_blank')} margin={'0'} cursor={'pointer'}>
                                <FaTwitter />
                            </RowContainer>
                            <Subtitle margin={'10px'}>Giveaway Display: { company.socials[0].twitter.display ? 'On' : 'Off' }</Subtitle>
                        </RowContainer>
                    </RowContainer>
                }
            </ContentContainer>
            <Button onClick={() => changeView()}>Update</Button>
        </MainContainer>
    )
}

export default Company;