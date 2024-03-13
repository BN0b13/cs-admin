import AccountDetails from '../../../../components/accounts/account-details/account-details.component';

import {
    ContentContainer,
    MainContainer
} from '../../../../styles/page.styles';

const ContributorAccountPage = () => {

    return (
        <MainContainer>
            <ContentContainer>
                <AccountDetails />
            </ContentContainer>
        </MainContainer>
    )
}

export default ContributorAccountPage;