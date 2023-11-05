import { useEffect, useState } from 'react';

import Message from './message/message.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';


import {
    MainContainer,
    MessagesTable,
    MessagesTableHeader,
    MessagesTableHead,
    MessagesTableBody,
    MessagesTableRow,
    MessagesTitle,
    TabContainer,
    TabSelector
} from './messages.styles';

const client = new Client();

const MessagesPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);
    const [ tabFourActive, setTabFourActive ] = useState(false);
    const [ newMessages, setNewMessages ] = useState('');
    const [ readMessages, setReadMessages ] = useState('');
    const [ deletedMessages, setDeletedMessages ] = useState('');

    useEffect(() => {
        const getMessages = async () => {
            const getMessages = await client.getMessages();
            const deletedMessageFilter = getMessages.rows.filter(message => message.deleted);
            const deletedMessagesSorted = sortByDate(deletedMessageFilter);
            const newMessageFilter = getMessages.rows.filter(message => message.status === 'new' && !message.deleted);
            const newMessagesSorted = sortByDate(newMessageFilter);
            const readMessageFilter = getMessages.rows.filter(message => message.status === 'read' && !message.deleted);
            const readMessagesSorted = sortByDate(readMessageFilter);

            setDeletedMessages(deletedMessagesSorted);
            setNewMessages(newMessagesSorted);
            setReadMessages(readMessagesSorted);
            setLoading(false);
        }

        getMessages();
    }, []);

    const sortByDate = (dates) => {
        return dates.sort(function(a,b){
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }

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
            return newMessages.map((message, index) => (
                <MessagesTableRow key={index} onClick={() => window.location = `/messages/${message.id}`}>
                    <Message message={message} />
                </MessagesTableRow>
            ));
        }

        if(currentTab === 3) {
            return readMessages.map((message, index) => (
                <MessagesTableRow key={index} onClick={() => window.location = `/messages/${message.id}`}>
                    <Message message={message} />
                </MessagesTableRow>
            ));
        }

        if(currentTab === 4) {
            return deletedMessages.map((message, index) => (
                <MessagesTableRow key={index} onClick={() => window.location = `/messages/${message.id}`}>
                    <Message message={message} />
                </MessagesTableRow>
            ));
        }

        return (
            <>
                {newMessages.map((message, index) => (
                    <MessagesTableRow key={index + 'new'} onClick={() => window.location = `/messages/${message.id}`}>
                        <Message message={message} />
                    </MessagesTableRow>
                ))}
                {readMessages.map((message, index) => (
                    <MessagesTableRow key={index + 'read'} onClick={() => window.location = `/messages/${message.id}`}>
                        <Message message={message} />
                    </MessagesTableRow>
                ))}
            </>
        )
    }

    return (
        <>
            {loading ?
                <Spinner />
            :
                <MainContainer>
                    <TabContainer>
                        <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Active</TabSelector>
                        <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>New</TabSelector>
                        <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Read</TabSelector>
                        <TabSelector active={tabFourActive} onClick={() => activateTabFour()}>Deleted</TabSelector>
                    </TabContainer>
                    <MessagesTitle>Messages</MessagesTitle>
                    <MessagesTable>
                        <MessagesTableHeader>
                            <MessagesTableRow>
                                <MessagesTableHead>Status</MessagesTableHead>
                                <MessagesTableHead>Replied</MessagesTableHead>
                                <MessagesTableHead>Name</MessagesTableHead>
                                <MessagesTableHead>Date</MessagesTableHead>
                            </MessagesTableRow>
                        </MessagesTableHeader>
                        <MessagesTableBody>
                            { showCurrentTab() }
                        </MessagesTableBody>
                    </MessagesTable>
                </MainContainer>

            }
        </>
    )
}

export default MessagesPage;