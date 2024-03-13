import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/reusable/button/button.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client.js';
import Tools from '../../tools/tools.js';

import {
    BackText,
    ButtonContainer,
    ContactInfoContainer,
    ContactInfoMessage,
    ContactInfoText,
    DeleteMessageButton,
    MainContainer,
    MessageContainer,
    MessageDataContainer,
    MessageTitle
} from './message.styles';

const client = new Client();
const tools = new Tools();

const MessagePage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ message, setMessage ] = useState('');

    useEffect(() => {
        const setMessageToReadStatus = async () => {
            const data = {
                id,
                status: 'read'
            }
            await client.updateMessage(data);
            
            getMessage();
        }

        setMessageToReadStatus();
    }, []);

    const getMessage = async () => {
        setLoading(true);
        const res = await client.getMessageById(id);
        setMessage(res[0]);
        setLoading(false);
    }

    const markMessageReplied = async () => {
        setLoading(true);
        const data = {
            id,
            replied: !message.replied
        }
        await client.updateMessage(data);
        await getMessage();
        return
    }

    const updateMessageStatus = async () => {
        setLoading(true);
        const status =  message.status === 'new' ? 'read' : 'new';
        const data = {
            id,
            status
        }
        await client.updateMessage(data);
        await getMessage();
        return
    }

    const softDeleteItem = async () => {
        setLoading(true);
        const data = {
            id,
            deleted: !message.deleted
        }
        await client.updateMessage(data);
        await getMessage();
        return
    }
    

    return (
        <>
            <BackText onClick={() => window.location = '/messages'}>Back</BackText>
            <MainContainer>
                <MessageTitle>Message</MessageTitle>
                {loading ?
                    <Spinner />
                :
                    message ?
                        <>
                            <MessageDataContainer>
                                <ContactInfoContainer>
                                    <ContactInfoText>Name: { `${message.firstName} ${message.lastName}` }</ContactInfoText>
                                    <ContactInfoText>Phone: { message.phone }</ContactInfoText>
                                    <ContactInfoText>Email: { message.email }</ContactInfoText>
                                </ContactInfoContainer>
                                <ContactInfoContainer>
                                    <ContactInfoText>Date: { tools.formatCreatedAtDate(message.createdAt) }</ContactInfoText>
                                    <ContactInfoText>Status: { message.status }</ContactInfoText>
                                    <ContactInfoText>Replied: { message.replied ? 'Yes' : 'No' }</ContactInfoText>
                                </ContactInfoContainer>
                            </MessageDataContainer>
                            <MessageContainer>
                                <ContactInfoMessage>{ message.message }</ContactInfoMessage>
                            </MessageContainer>
                            <ButtonContainer>
                                <Button onClick={() => markMessageReplied()}>
                                { message.replied ? 'Undo Replied' : 'Mark Replied' }
                                </Button>
                                <Button onClick={() => updateMessageStatus()}>
                                    { message.status === 'new' ? 'Mark Read' : 'Mark New' }
                                </Button>
                            </ButtonContainer>
                            <DeleteMessageButton color={message.deleted ? 'green' : 'red'} onClick={() => softDeleteItem()}>{ message.deleted ? 'Restore' : 'DELETE' }</DeleteMessageButton>
                        </>
                    :
                        <MessageTitle>No Message To Display</MessageTitle>
                }
            </MainContainer>

        </>
    )
}

export default MessagePage;