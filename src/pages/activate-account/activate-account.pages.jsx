import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/reusable/button/button.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import Toasted from '../../components/reusable/toasted/toasted.component';

import Client from '../../tools/client';
import { states } from '../../tools/states';
import {
    passwordValidation,
    phoneInputValidation,
    usernameInputValidation,
    zipCodeInputValidation
} from '../../tools/user';
import { tokenName } from '../../config';

import {
    ActivateAccountInput,
    ActivateAccountOption,
    ActivateAccountSelect,
    AddressBottomContainer,
    AddressBottomInput,
    ButtonContainer,
    MainContainer
} from './activate-account.styles';

const client = new Client();

const ActivateAccountPage = () => {
    const [ loading, setLoading ] = useState(true);
    const { passwordToken } = useParams();
    const [ account, setAccount ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordTextVisible, setPasswordTextVisible ] = useState(false);
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ confirmPasswordTextVisible, setConfirmPasswordTextVisible ] = useState(false);
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ addressOne, setAddressOne ] = useState('');
    const [ addressTwo, setAddressTwo ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ zipCode, setZipCode ] = useState('');
    const [ toastMessage, setToastMessage ] = useState('Account has been created successfully');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    
    useEffect(() => {
        const getAccount = async () => {
            const res = await client.getAccountByPasswordToken(passwordToken);
            
            if(res.length === 0) {
                setAccount(res);
            } else {
                setAccount(res[0]);
            }
            
            setLoading(false);
        }
        
        getAccount();
    }, [passwordToken]);
    
    const getToasted = (toast) => toast();

    const errorToast = (message) => {
        setToastMessage(message);
        setToastError(true);
        setShowToast(true);
    }

    const validateFields = async () => {
        if(username === '' ||
            password === '' ||
            confirmPassword === '' ||
            phone === '' ||
            addressOne === '' ||
            city === '' ||
            state === '' ||
            zipCode === '') {
            errorToast('Please fill out all fields to activate account.');
            return false;
        }

        if(password !== confirmPassword) {
            errorToast('Password and Confirm Password needs to match.');
            return false;
        }

        if(!passwordValidation(password)) {
            errorToast('Password needs to be between 8 and 30 characters long with at least one number and one special character.');
            return false;
        }

        if(phone.length < 10) {
            errorToast('Phone needs to be 10 numbers long.');
            return false;
        }

        if(zipCode.length < 5) {
            errorToast('Zip Code needs to be 5 numbers long.');
            return false;
        }

        return true;
    }

    const activateAccount = async () => {
        if(!validateFields()) {
            return
        }

        const data = {
            passwordToken,
            username,
            password,
            firstName,
            lastName,
            phone,
            billingAddress: {
                addressOne,
                addressTwo,
                city,
                state,
                zipCode
            }
        }

        setLoading(true);

        const res = await client.activateAdminCreatedAccount(data);

        if(res && res.token) {
            localStorage.setItem(tokenName, res.token);
            sessionStorage.setItem(tokenName, JSON.stringify(res.data));
            window.location = '/';
        } else {
            errorToast('Account Activation Failed');
            setLoading(false);
        }
    }

    const accountDisplay = () => {

        return (
            <>
                <h2>Activate Account</h2>
                <h4>Email: { account.email }</h4>

                <ActivateAccountInput type='text' name='username' value={username} onChange={(e) => usernameInputValidation(e.target.value, setUsername)} placeholder='Username' />
                <ActivateAccountInput type={passwordTextVisible ? 'text' : 'password'} name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <ActivateAccountInput type={confirmPasswordTextVisible ? 'text' : 'password'} name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
                <ActivateAccountInput type='text' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
                <ActivateAccountInput type='text' name='lastName'  value={lastName}onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
                <ActivateAccountInput type='text' name='phone'  value={phone} onChange={(e) => phoneInputValidation(e.target.value, setPhone)} placeholder='Phone' />
                <ActivateAccountInput type='text' name='addressOne' value={addressOne} onChange={(e) => setAddressOne(e.target.value)} placeholder='Address Line One' />
                <ActivateAccountInput type='text' name='addressTwo' value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} placeholder='Address Line Two' />
                <AddressBottomContainer>
                    <AddressBottomInput type='text' name='city' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' />
                    <ActivateAccountSelect name='state' value={state} onChange={(e) => setState(e.target.value)}>
                        <ActivateAccountOption key={0} value={''} disabled> -- State -- </ActivateAccountOption>
                        {states.map((state, index) => 
                            <ActivateAccountOption
                                key={index + 1}
                                value={state.abbreviation}
                            >
                                { state.abbreviation }
                            </ActivateAccountOption>
                        )}
                    </ActivateAccountSelect>
                    <AddressBottomInput type='text' name='zipCode' value={zipCode} onChange={(e) => zipCodeInputValidation(e.target.value, setZipCode)} placeholder='Zip Code' />
                </AddressBottomContainer>

                <ButtonContainer>
                    <Button onClick={() => activateAccount()}>Activate Account</Button>
                </ButtonContainer>
            </>
        )
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                account.length === 0 ?
                    <h2>No account to activate. Please contact support.</h2>
                :
                    accountDisplay()
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

export default ActivateAccountPage;