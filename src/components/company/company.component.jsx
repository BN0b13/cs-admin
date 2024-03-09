import AddCompanyLogo from './add-company-logo/add-company-logo.component';
import CompanyLogo from './company-logo/company-logo.component';
import Button from '../reusable/button/button.component';

import {
    MainContainer,
    Text,
    Title
} from '../../styles/component.styles';

const Company = ({ company, getCompany, setShowUpdate }) => {

    return (
        <MainContainer>
            <Title>Company Details</Title>
            {!company.logoFilename ?
                <AddCompanyLogo id={company.id} getCompany={getCompany} />
            :
                <CompanyLogo  company={company} getCompany={getCompany} />
            }

            <Text>Name: { company.name || 'None' }</Text>
            <Text>Bio: { company.bio || 'None' }</Text>
            <Text>URL: { company.url || 'None' }</Text>
            {!company.socials ?
                <Text>Socials: None</Text>
            :
                <>
                    <Text>Discord: { company.socials.discord }</Text>
                    <Text>Facebook: { company.socials.facebook }</Text>
                    <Text>LinkedIn: { company.socials.linkedIn }</Text>
                    <Text>Reddit: { company.socials.reddit }</Text>
                    <Text>Twitter: { company.socials.twitter }</Text>
                </>
            }
            <Button onClick={() => setShowUpdate(true)}>Update</Button>
        </MainContainer>
    )
}

export default Company;