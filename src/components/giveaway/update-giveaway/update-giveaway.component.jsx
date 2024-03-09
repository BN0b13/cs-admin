import { useState } from 'react';
import { IoBuild, IoCloseSharp } from "react-icons/io5";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Button from '../../reusable/button/button.component';
import Spinner from '../../reusable/spinner/spinner.component';
import Toasted from '../../reusable/toasted/toasted.component';

import Client from '../../../tools/client';

import {
    ColumnContainer,
    Input,
    MainContainer,
    Option,
    RowContainer,
    Select,
    Textarea,
    Text,
    Title
} from '../../../styles/component.styles';

import {
    GiveawayButton,
    GiveawayColumnContainer,
    GiveawayText,
    GiveawayTextarea
} from '../giveaway.styles';

const client = new Client();

const UpdateGiveaway = ({ giveaway, getGiveaway, setShowUpdate }) => {
    const [ loading, setLoading ] = useState(false);
    const [ name, setName ] = useState(giveaway.name);
    const [ description, setDescription ] = useState(giveaway.description);
    const [ rules, setRules ] = useState(giveaway.rules ? giveaway.rules : []);
    const [ rule, setRule ] = useState('');
    const [ showEditRule, setShowEditRule ] = useState(false);
    const [ editRuleId, setEditRuleId ] = useState('');
    const [ prizes, setPrizes ] = useState(giveaway.prizes);
    const [ prize, setPrize ] = useState('');
    const [ showEditPrize, setShowEditPrize ] = useState(false);
    const [ editPrizeId, setEditPrizeId ] = useState('');
    const [ prizeWinnerLimit, setPrizeWinnerLimit ] = useState(1);
    const [ giveawayExpirationOption, setGiveawayExpirationOption ] = useState(giveaway.type);
    const [ startDate, setStartDate ] = useState(giveaway.startDate ? new Date(parseInt(giveaway.startDate)) : '');
    const [ expirationDate, setExpirationDate ] = useState(giveaway.expirationDate ? new Date(parseInt(giveaway.expirationDate)) : '');
    const [ entryLimit, setEntryLimit ] = useState(giveaway.entryLimit ? giveaway.entryLimit : '');
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const getToasted = (toast) => toast();

    const errorToast = (message) => {
        setToastMessage(message);
        setToastError(true);
        setShowToast(true);
    }

    const nonNegativeIntegerInput = (e, setInput) => {
        if(e < 1 && e !== '') {
            return
        }
        return setInput(e);
    }

    const submitRule = () => {
        if(rule === '') {
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
            return
        }
        const count = prizes.length;
        const newPrize = {
            id: count,
            prize,
            prizeWinnerLimit
        };

        const data = [ ...prizes, newPrize ];

        setPrizes(data);
        setPrize('');
        setPrizeWinnerLimit(1);
    }

    const editPrize = (id) => {
        const data = prizes.filter(prize => prize.id === id);
        setPrize(data[0].prize);
        setPrizeWinnerLimit(data[0].prizeWinnerLimit);
        setShowEditPrize(true);
        setEditPrizeId(id);
    }

    const submitEditPrize = (id) => {
        const currentData = prizes.filter(prize => prize.id !== id);
        const editedPrize = {
            id,
            prize,
            prizeWinnerLimit
        };
        const data = [...currentData, editedPrize];
        removePrize(id);
        setPrizes(data.sort((a,b) => a.id - b.id));
        cancelEditPrize();
    }

    const cancelEditPrize = () => {
        setPrize('');
        setPrizeWinnerLimit(1);
        setShowEditPrize(false);
        setEditPrizeId('');
    }

    const removePrize = (id) => {
        const data = prizes.filter(prize => prize.id !== id);
        setPrizes(data);
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
            return (
                <GiveawayColumnContainer>
                    <Input type='number' min='1' value={entryLimit} onChange={(e) => nonNegativeIntegerInput(e.target.value, setEntryLimit)} placeholder='User Limit' />
                </GiveawayColumnContainer>
            )
        }

        if(giveawayExpirationOption === 'manual') {
            return
        }
    }

    const submitGiveawayUpdate = async () => {
        if(name === '' ||
            description === '' ||
            prizes.length < 1) {
            errorToast('Please fill out all fields to create giveaway.');
            return
        }

        if(!giveawayExpirationOption) {
            errorToast('Please select a way to conclude giveaway.');
            return
        }

        if(giveawayExpirationOption === 'scheduled' && (startDate === '' || expirationDate === '')) {
            errorToast('Please finish selecting start or end date to create giveaway.');
            return
        }

        if(giveawayExpirationOption === 'entryLimit' && entryLimit === '') {
            errorToast('Please select entry limit to giveaway.');
            return
        }

        const data = {
            id: giveaway.id,
            name,
            description,
            prizes,
            type: giveawayExpirationOption
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

        if(entryLimit) {
            data.entryLimit = entryLimit;
        }

        const res = await client.updateGiveaway(data);

        if(res) {
            await getGiveaway();
            setShowUpdate(false);
        } else {
            errorToast('There was an error updating giveaway. Please try again.');
            return
        }
    }
    
    return (
        <MainContainer>
            <Title>Update Giveaway</Title>
            {loading ?
                <Spinner />
            :
                <GiveawayColumnContainer>
                    <Input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                    <Textarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    <GiveawayColumnContainer>
                        {rules && rules.map((rule, index) => (
                            <RowContainer key={index}>
                                <ColumnContainer>
                                    <GiveawayText>{index + 1}. {rule.rule}</GiveawayText>
                                </ColumnContainer>
                                <IoBuild onClick={() => editRule(rule.id)} size={14} />
                                <IoCloseSharp onClick={() => removeRule(rule.id)} size={14} />
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
                                <ColumnContainer>
                                    <GiveawayText>{index + 1}. {prize.prize} - {prize.prizeWinnerLimit} Winner{prize.prizeWinnerLimit > 1 && 's'}</GiveawayText>
                                </ColumnContainer>
                                <IoBuild onClick={() => editPrize(prize.id)} size={14} />
                                <IoCloseSharp onClick={() => removePrize(prize.id)} size={14} />
                            </RowContainer>
                        ))}
                        <Input type='text' name='prize' value={prize} onChange={(e) => setPrize(e.target.value)} placeholder='Prize' />
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
                        <Text>Giveaway Expiration Options</Text>
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
                    
                    <RowContainer>
                        <Button onClick={() => setShowUpdate()}>Cancel</Button>
                        <Button onClick={() => submitGiveawayUpdate()}>Update</Button>
                    </RowContainer>
                </GiveawayColumnContainer>
            }
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

export default UpdateGiveaway;