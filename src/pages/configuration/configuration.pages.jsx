import { useEffect, useState } from 'react';

import AccountDetails from '../../components/accounts/account-details/account-details.component';
import Contents from '../../components/configuration/welcome/contents/contents.component';
import CurrentWelcomeImages from '../../components/configuration/welcome/current/current.component';
import ImportWelcomeImage from '../../components/configuration/welcome/import/import.component';
import Theme from '../../components/theme/theme.component';

import Client from "../../tools/client";

import {
    ConfigurationTitle,
    ContentContainer,
    MainContainer,
    TabContainer,
    TabSelector
} from './configuration.styles';

const client = new Client();

const ConfigurationPage = () => {
    const [ images, setImages ] = useState([]);
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);
    const [ tabFourActive, setTabFourActive ] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const welcomeImages = await client.getWelcomeImages();

            welcomeImages.rows.sort((a, b) => a.position - b.position);

            setImages(welcomeImages.rows);
        }

        getData();
    }, []);

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
        setTabThreeActive(false);
        setTabFourActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
        setTabThreeActive(false);
        setTabFourActive(false);
    }

    const activateTabThree = () => {
        setCurrentTab(3);
        setTabOneActive(false);
        setTabTwoActive(false);
        setTabThreeActive(true);
        setTabFourActive(false);
    }

    const activateTabFour = () => {
        setCurrentTab(4);
        setTabOneActive(false);
        setTabTwoActive(false);
        setTabThreeActive(false);
        setTabFourActive(true);
    }

    const showCurrentTab = () => {
        if(currentTab === 2) {
            return (
                <h2>About Page Configuration</h2>
            )
        }

        if(currentTab === 3) {
            return (
                <Theme />
            )
        }

        if(currentTab === 4) {
            return (
                <AccountDetails />
            )
        }

        return (
            <div>
                <ConfigurationTitle>Welcome Page Configuration</ConfigurationTitle>
                <CurrentWelcomeImages images={images} refreshImages={refreshImages} />
                <ImportWelcomeImage refreshImages={refreshImages} />
                <Contents />
            </div>
        )
    }

    const refreshImages = async () => {
        const res = await client.getWelcomeImages();

        setImages(res.rows);
    }

    return (
        <MainContainer>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Welcome Page</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>About Page</TabSelector>
                <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Theme</TabSelector>
                <TabSelector active={tabFourActive} onClick={() => activateTabFour()}>Store Account</TabSelector>
            </TabContainer>
            <ContentContainer>
                { showCurrentTab() }
            </ContentContainer>
        </MainContainer>
    )
}

export default ConfigurationPage;