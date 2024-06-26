import { useContext, useState } from 'react';
import dayjs from 'dayjs';

import AdminModal from '../reusable/admin-modal/admin-modal.component';
import Button from '../reusable/button/button.component';
import Spinner from '../reusable/spinner/spinner.component';

import { ToastContext } from '../../contexts/toast.context';

import Client from '../../tools/client';

import {
    ButtonContainer,
    MainContainer,
    RowContainer,
    Subtitle,
    Title
} from '../../styles/component.styles';

const client = new Client();

const Giveaway = ({ giveaway, getGiveaway, setShowUpdate, setShowEntries }) => {
    const [ loading, setLoading ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    
    const { successToast } = useContext(ToastContext);

    const changeDisplay = async () => {
        setShowEntries(true);
        await getGiveaway();
    }

    const copyEmailToClipboard = (email) => {
        navigator.clipboard.writeText(email);
        successToast(`Copied email ${email} to Clipboard`);
    }

    const changeGiveawayStatus = async () => {
        setLoading(true);
        const data = {
            id: giveaway.id,
        };

        if(giveaway.status === 'created') {
            data.status = 'active';
        }

        if(giveaway.status === 'active') {
            data.status = 'completed';
        }

        await client.updateGiveaway(data);

        await getGiveaway();
        setLoading(false);
    }

    return (
        <MainContainer>
            <AdminModal 
                show={showModal}
                setShow={setShowModal}
                title={`${giveaway.status === 'created' ? 'Start' : 'End'} Giveaway`}
                message={`Are you sure you want to ${giveaway.status === 'created' ? 'start' : 'end'} giveaway? ${giveaway.status === 'created' ? 'Starting this giveaway will disable all updating or deleting of this giveaway.' : 'Ending this giveaway will automatically select winners.'} Do you want to continue?`}
                action={() => changeGiveawayStatus()} 
                actionText={'Confirm'}
            />
            <Title>Giveaway {giveaway.name}</Title>
            {loading ?
                <Spinner />
            :
                <>
                    <ButtonContainer>
                        <Button onClick={() => changeDisplay()}>Show Entries</Button>
                    </ButtonContainer>
                    <Subtitle>Status: { giveaway.status }</Subtitle>
                    <Subtitle>Entries: { giveaway.entries.length }</Subtitle>
                    <Subtitle>Type: { giveaway.type }</Subtitle>
                    {giveaway.type === 'scheduled' &&
                        <>
                            <Subtitle>Start Date and Time: {dayjs(new Date(parseInt(giveaway.startDate))).format('MM/DD/YYYY hh:mm a').toString()}</Subtitle>
                            <Subtitle>End Date and Time: {dayjs(new Date(parseInt(giveaway.expirationDate))).format('MM/DD/YYYY hh:mm a').toString()}</Subtitle>
                        </>
                    }
                    <Subtitle>Name: { giveaway.name }</Subtitle>
                    <Subtitle>Description: { giveaway.description }</Subtitle>
                    <Subtitle>Rules:</Subtitle>
                    <RowContainer width={'300px'} flexDirection={'column'}>
                        {!giveaway.rules ?
                            <Subtitle>No Rules associated with Giveaway</Subtitle>
                        :
                            giveaway.rules.map((rule, index) => (
                                <Subtitle key={index} textAlign={'left'}>{ index + 1 }. { rule.rule }</Subtitle>
                            ))
                        }
                    </RowContainer>
                    <Subtitle>Prizes: </Subtitle>
                    {giveaway.prizes.map((prize, index) => (
                        <RowContainer key={index} width={'300px'} flexDirection={'column'}>
                            <Subtitle textAlign={'left'}>{ index + 1 }. { prize.prizeType === 'credit' ? `$${parseInt(prize.prize)/100} credit on account` : prize.prize } - { prize.prizeWinnerLimit } Winner{ prize.prizeWinnerLimit > 1 ? 's' : ''}</Subtitle>
                            {giveaway.status === 'completed' &&
                                giveaway.winners.forEach((winner, index) => {
                                    if(winner.prize.id === prize.id) {
                                        return(
                                            <RowContainer key={index} justifyContent='flex-start' margin='0 0 0 30px' cursor='pointer'>
                                                <Subtitle textAlign={'center'} onClick={() => copyEmailToClipboard(winner.email)}>Username: { winner.username } - Email: { winner.email }</Subtitle>
                                            </RowContainer>
                                        )
                                    }
                                })
                            }
                        </RowContainer>
                    ))}

                    {giveaway.type === 'manual' && (giveaway.status === 'created' || giveaway.status === 'active') &&
                        <Button onClick={() => setShowModal(true)}>{giveaway.status === 'created' ? 'Start' : 'End'} Giveaway</Button>
                    }
                    {giveaway.type === 'entryLimit' && (giveaway.status === 'created') &&
                        <RowContainer margin='40px 0 20px 0'>
                            <Button onClick={() => setShowModal(true)}>Start Giveaway</Button>
                        </RowContainer>
                    }

                    {giveaway.status === 'created' &&
                        <RowContainer margin='20px 0'>
                            <Button onClick={() => setShowUpdate(true)}>Update Giveaway</Button>
                        </RowContainer>
                    }
                </>
            }
        </MainContainer>
    )
}

export default Giveaway;