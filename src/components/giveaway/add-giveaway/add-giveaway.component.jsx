import { useContext, useState } from 'react';
import dayjs from 'dayjs';
import { IoBuild, IoCloseSharp } from "react-icons/io5";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import AdminModal from '../../reusable/admin-modal/admin-modal.component';
import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';

import { ToastContext } from '../../../contexts/toast.context';
import { UserContext } from '../../../contexts/user.context';

import Client from '../../../tools/client';
import GiveawayHelper from '../../../tools/giveaway';

import {
    ColumnContainer,
    Input,
    MainContainer,
    Option,
    RowContainer,
    Select,
    Subtext,
    Subtitle,
    Textarea,
    Text,
    Title
} from '../../../styles/component.styles';

import {
    GiveawayButton,
    GiveawayColumnContainer,
    GiveawayRowContainer,
    GiveawayText,
    GiveawayTextarea
} from '../giveaway.styles';

const client = new Client();
const giveawayHelper = new GiveawayHelper();

const AddGiveaway = ({ setShowAddGiveaway, company }) => {
    const [ loading, setLoading ] = useState(false);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ disclaimer, setDisclaimer ] = useState('You must be 21+ and in the US to enter giveaway');
    const [ rules, setRules ] = useState('');
    const [ rule, setRule ] = useState('');
    const [ showEditRule, setShowEditRule ] = useState(false);
    const [ editRuleId, setEditRuleId ] = useState('');
    const [ prizes, setPrizes ] = useState('');
    const [ prize, setPrize ] = useState('');
    const [ prizeType, setPrizeType ] = useState('manual');
    const [ showEditPrize, setShowEditPrize ] = useState(false);
    const [ editPrizeId, setEditPrizeId ] = useState('');
    const [ prizeWinnerLimit, setPrizeWinnerLimit ] = useState(1);
    const [ giveawayExpirationOption, setGiveawayExpirationOption ] = useState('');
    const [ startDate, setStartDate ] = useState('');
    const [ expirationDate, setExpirationDate ] = useState('');
    const [ entryLimit, setEntryLimit ] = useState('');
    const [ entryType, setEntryType ] = useState('manual');
    const [ giveawayOptions, setGiveawayOptions ] = useState([]);
    const [ giveawayData, setGiveawayData ] = useState('');
    const [ showModal, setShowModal ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');
    
    const { errorToast } = useContext(ToastContext);
    const { currentUser } = useContext(UserContext);

    const nonNegativeIntegerInput = (e, setInput) => {
        if(e < 1 && e !== '') {
            return
        }
        return setInput(e);
    }

    const submitRule = () => {
        if(rule === '') {
            errorToast('Please enter a rule to add rule to giveaway.');
            return
        }
        const count = rules.length;
        const data = [
        ...rules,    
        {
            id: count,
            rule
        }];

        setRules(data);
        setRule('');
    }

    const editRule = (id) => {
        const data = rules.filter(rule => rule.id === id);
        setRule(data[0].rule);
        setShowEditRule(true);
        setEditRuleId(id);
    }

    const submitEditRule = (id) => {
        const currentData = rules.filter(rule => rule.id !== id);
        const editedRule = {
            id,
            rule
        };
        const data = [...currentData, editedRule];
        removeRule(id);
        setRules(data.sort((a,b) => a.id - b.id));
        cancelEditRule();
    }

    const cancelEditRule = () => {
        setRule('');
        setShowEditRule(false);
        setEditRuleId('');
    }

    const removeRule = (id) => {
        const data = rules.filter(rule => rule.id !== id);
        setRules(data);
    } 

    const submitPrize = () => {
        if(prize === '' || prizeWinnerLimit === '') {
            errorToast('Please enter a prize to add prize to giveaway.');
            return
        }
        
        const count = prizes.length;
        const newPrize = {
            id: count,
            prize,
            prizeType,
            prizeWinnerLimit: parseInt(prizeWinnerLimit)
        };

        const data = [ ...prizes, newPrize ];

        setPrizes(data);
        setPrize('');
        setPrizeType('manual');
        setPrizeWinnerLimit(1);
    }

    const editPrize = (id) => {
        const data = prizes.filter(prize => prize.id === id);
        setPrize(data[0].prize);
        setPrizeWinnerLimit(data[0].prizeWinnerLimit);
        setPrizeType(data[0].prizeType);
        setShowEditPrize(true);
        setEditPrizeId(id);
    }

    const submitEditPrize = (id) => {
        const currentData = prizes.filter(prize => prize.id !== id);
        const editedPrize = {
            id,
            prize,
            prizeType,
            prizeWinnerLimit: parseInt(prizeWinnerLimit)
        };
        const data = [...currentData, editedPrize];
        removePrize(id);
        setPrizes(data.sort((a,b) => a.id - b.id));
        cancelEditPrize();
    }

    const cancelEditPrize = () => {
        setPrize('');
        setPrizeType('manual');
        setPrizeWinnerLimit(1);
        setShowEditPrize(false);
        setEditPrizeId('');
    }

    const removePrize = (id) => {
        const data = prizes.filter(prize => prize.id !== id);
        setPrizes(data);
        if(showEditPrize) {
            cancelEditPrize();
        }
    }

    const filterStartTime = (date) => {
        const isPastTime = new Date().getTime() > date.getTime();
        return !isPastTime;
    };

    const filterExpirationTime = (date) => {
        const minimumGiveawayTime = 5;
        const isPastTime = (startDate.getTime() + minimumGiveawayTime) > date.getTime();
        return !isPastTime;
    };

    const selectExpirationOption = (e) => {
        if(e !== 'scheduled') {
            setStartDate('');
            setExpirationDate('');
        }

        if(e !== 'entryLimit') {
            setEntryLimit('');
        }

        setGiveawayExpirationOption(e);
    }

    const giveawayExpirationOptions = () => {
        if(giveawayExpirationOption === 'scheduled') {
            return (
                <>
                    <GiveawayColumnContainer>
                        <DatePicker 
                            selected={startDate} 
                            onChange={(e) => setStartDate(e)} 
                            showTimeSelect 
                            timeIntervals={5}
                            minDate={new Date()}
                            filterTime={filterStartTime}
                            placeholderText="Select Start Date and Time"
                        />
                    </GiveawayColumnContainer>
                    <GiveawayColumnContainer>
                        {startDate &&
                            <DatePicker 
                                selected={expirationDate} 
                                onChange={(e) => setExpirationDate(e)} 
                                showTimeSelect 
                                timeIntervals={5}
                                minDate={startDate || ''}
                                filterTime={filterExpirationTime}
                                placeholderText="Select End Date and Time"
                            />
                        }
                    </GiveawayColumnContainer>
                </>
            )
        }

        if(giveawayExpirationOption === 'entryLimit') {
            let minEntryLimit = 0;

            if(prizes) {
                prizes.map(prize => minEntryLimit = minEntryLimit + prize.prizeWinnerLimit);
            }

            return (
                <GiveawayColumnContainer>
                    <Input type='number' min={minEntryLimit} value={entryLimit} onChange={(e) => nonNegativeIntegerInput(e.target.value, setEntryLimit)} placeholder='Entry Limit' />
                </GiveawayColumnContainer>
            )
        }

        if(giveawayExpirationOption === 'manual') {
            return
        }
    }

    const confirmGiveaway = async () => {
        const data = {
            companyId: company.id,
            name,
            description,
            prizes,
            type: giveawayExpirationOption,
            entryType
        }

        if(disclaimer) {
            data.disclaimer = disclaimer;
        }

        if(rules) {
            data.rules = rules;
        }

        if(startDate) {
            const unixStartDate = new Date(startDate).getTime();
            data.startDate = unixStartDate;
        }

        if(expirationDate) {
            const unixExpirationDate = new Date(expirationDate).getTime();
            data.expirationDate = unixExpirationDate;
        }

        if(giveawayExpirationOption === 'entryLimit') {
            data.entryLimit = entryLimit;
        }

        const validation = giveawayHelper.validateGiveaway(data);
        
        if(!validation.result) {
            if(validation.reset && validation.reset.startDate) {
                setStartDate('');
            }
            if(validation.reset && validation.reset.expirationDate) {
                setExpirationDate('');
            }
            errorToast(validation.error);
            return
        }

        setGiveawayData(data);

        if(giveawayExpirationOption === 'scheduled') {
            const formattedStartDate = dayjs(new Date(startDate)).format('MM/DD/YYYY hh:mm a').toString();
            const formattedEndDate = dayjs(new Date(expirationDate)).format('MM/DD/YYYY hh:mm a').toString();

            setModalMessage(`This will be a Scheduled Giveaway. It will automatically start on ${formattedStartDate} and end on ${formattedEndDate}. Once the giveaway has started it cannot be updated or deleted. Do you want to continue?`);
        }
        if(giveawayExpirationOption === 'entryLimit') {
            setModalMessage('This will be an Entry Limit Giveaway. It will require you to manually start it and will conclude once the entry limit has been met. Once the giveaway has started it cannot be updated or deleted. Do you want to continue?');
        }
        if(giveawayExpirationOption === 'manual') {
            setModalMessage('This will be a Manual Giveaway. It will require you to both start and end the giveaway. Once the giveaway has started it cannot be updated or deleted. Do you want to continue?');
        }
        setShowModal(true);
    }

    const submitGiveaway = async () => {
        if(!giveawayData) {
            errorToast('Something happened. Please try again.');
            return
        }
        const res = await client.createGiveaway(giveawayData);

        if(res) {
            window.location = `/giveaways/${res.id}`;
        } else {
            errorToast('There was an error creating giveaway. Please try again.');
            return
        }
    }
    
    return (
        <MainContainer>
            <AdminModal 
                show={showModal}
                setShow={setShowModal}
                title={'Create Giveaway'}
                message={modalMessage} 
                action={submitGiveaway} 
                actionText={'Create'}
            />
            <Title>Add Giveaway</Title>
            <GiveawayText>Please input a name, description and at least one prize to create a giveaway.</GiveawayText>
            {loading ?
                <Spinner />
            :
                <GiveawayColumnContainer>
                    <Input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                    <Textarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    <Textarea name='disclaimer' value={disclaimer} onChange={(e) => setDisclaimer(e.target.value)} customHeight={'160px'} placeholder='Disclaimer' />
                    <GiveawayColumnContainer>
                        {rules && rules.map((rule, index) => (
                            <RowContainer key={index}>
                                <ColumnContainer margin={'5px'}>
                                    <GiveawayText margin={'5px'}>{index + 1}. {rule.rule}</GiveawayText>
                                </ColumnContainer>
                                <ColumnContainer margin={'5px'}>
                                    <IoBuild onClick={() => editRule(rule.id)} size={14} />
                                </ColumnContainer>
                                <ColumnContainer margin={'5px'}>
                                    <IoCloseSharp onClick={() => removeRule(rule.id)} size={14} />
                                </ColumnContainer>
                            </RowContainer>
                        ))}
                        <GiveawayTextarea name='rule' value={rule} onChange={(e) => setRule(e.target.value)} placeholder='Rule' />
                        {showEditRule ?
                            <RowContainer>
                                <GiveawayButton onClick={() => cancelEditRule()}>Cancel</GiveawayButton>
                                <GiveawayButton onClick={() => submitEditRule(editRuleId)}>Save</GiveawayButton>
                            </RowContainer>
                        :
                            <GiveawayColumnContainer>
                                <GiveawayButton onClick={() => submitRule()}>Add Rule</GiveawayButton>
                            </GiveawayColumnContainer>
                        }
                    </GiveawayColumnContainer>
                    <GiveawayColumnContainer>
                        {prizes && prizes.map((prize, index) => (
                            <RowContainer key={index}>
                                <ColumnContainer margin={'10px'}>
                                    <GiveawayText margin={'10px'}>{index + 1}. {prize.prizeType === 'credit' ? `$${parseInt(prize.prize)/100} credit on account` : prize.prize} - {prize.prizeWinnerLimit} Winner{prize.prizeWinnerLimit > 1 && 's'}</GiveawayText>
                                </ColumnContainer>
                                <ColumnContainer margin={'5px'}>
                                    <IoBuild onClick={() => editPrize(prize.id)} size={14} />
                                </ColumnContainer>
                                <ColumnContainer margin={'5px'}>
                                    <IoCloseSharp onClick={() => removePrize(prize.id)} size={14} />
                                </ColumnContainer>
                            </RowContainer>
                        ))}
                        {currentUser.roleId  < 4 ?
                            <ColumnContainer margin={'10px 0'}>
                                <ColumnContainer margin={'20px'}>
                                    <Select value={prizeType} onChange={(e) => setPrizeType(e.target.value)}>
                                        <Option value={'credit'}>Credit</Option>
                                        <Option value={'manual'}>Manual</Option>
                                    </Select>
                                </ColumnContainer>
                                {prizeType === 'credit' ?
                                    <Input type='number' name='prize' value={prize} onChange={(e) => nonNegativeIntegerInput(e.target.value, setPrize)} min={1} placeholder='Prize' />
                                :
                                    <Input type='text' name='prize' value={prize} onChange={(e) => setPrize(e.target.value)} placeholder='Prize' />
                                }
                            
                            </ColumnContainer>
                        :
                            <Input type='text' name='prize' value={prize} onChange={(e) => setPrize(e.target.value)} placeholder='Prize' />
                        }
                        <Input type='number' min='1' name='prizeWinnerLimit' value={prizeWinnerLimit} onChange={(e) => nonNegativeIntegerInput(e.target.value, setPrizeWinnerLimit)} placeholder='Prize Winner Amount' />
                        {showEditPrize ?
                            <RowContainer>
                                <GiveawayButton onClick={() => cancelEditPrize()}>Cancel</GiveawayButton>
                                <GiveawayButton onClick={() => submitEditPrize(editPrizeId)}>Save</GiveawayButton>
                            </RowContainer>
                        :
                            <GiveawayColumnContainer>
                                <GiveawayButton onClick={() => submitPrize()}>Add Prize</GiveawayButton>
                            </GiveawayColumnContainer>
                        }
                    </GiveawayColumnContainer>
                    <GiveawayColumnContainer>
                        <Subtitle>Giveaway Expiration</Subtitle>
                        <GiveawayText>Please select how you want to conclude the giveaway.</GiveawayText>
                        <GiveawayColumnContainer>
                            <Select value={giveawayExpirationOption} onChange={(e) => selectExpirationOption(e.target.value)}>
                                <Option value='' disabled> -- Select An Option -- </Option>
                                <Option value='scheduled'>Scheduled</Option>
                                <Option value='entryLimit'>Entry Limit</Option>
                                <Option value='manual'>Manual</Option>
                            </Select>
                        </GiveawayColumnContainer>
                        { giveawayExpirationOptions() }
                    </GiveawayColumnContainer>
                    {currentUser.Role.id < 4 &&
                        <GiveawayColumnContainer>
                            <Subtitle>Giveaway Entry Options</Subtitle>
                            <Select value={entryType} onChange={(e) => setEntryType(e.target.value)}>
                                <Option value='' disabled> -- Select An Option -- </Option>
                                <Option value='orders'>Orders</Option>
                                <Option value='manual'>Manual</Option>
                            </Select>
                        </GiveawayColumnContainer>
                    }
                    
                    <RowContainer>
                        <Button onClick={() => setShowAddGiveaway()}>Cancel</Button>
                        <Button onClick={() => confirmGiveaway()}>Create</Button>
                    </RowContainer>
                </GiveawayColumnContainer>
            }
        </MainContainer>
    )
}

export default AddGiveaway;