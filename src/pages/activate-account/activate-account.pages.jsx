import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import AdminModal from '../../components/reusable/admin-modal/admin-modal.component';
import Button from '../../components/reusable/button/button.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import TermsAndConditions from '../../components/reusable/terms-and-conditions/terms-and-conditions.component';

import { ToastContext } from '../../contexts/toast.context.jsx';

import Client from '../../tools/client.js';
import Tools from '../../tools/tools.js';
import { tokenName } from '../../config';

import logo from '../../assets/img/logo.png';

import {
    ActivateAccountInput,
    ActivateAccountLabel,
    ActivateAccountOption,
    ActivateAccountSelect,
    AddressBottomContainer,
    AddressBottomInput,
    ButtonContainer,
    MainContainer,
    MainImage,
    MainText,
    MainTitle,
    TermsContainer,
    TermsCheckbox,
    TermsText
} from './activate-account.styles';

import {
    InputSubtext
} from '../../styles/page.styles';

const client = new Client();
const tools = new Tools();

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
    const [ showTermsAndConditions, setShowTermsAndConditions ] = useState(false);
    const [ eulaChecked, setEulaChecked ] = useState(false);
    const [ accountData, setAccountData ] = useState({});
    const [ showModal, setShowModal ] = useState(false);
    
    const { errorToast } = useContext(ToastContext);
    
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

    const showAccountCreationDisclaimer = async () => {
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
            },
            eula: eulaChecked
        }

        const validationResult = tools.validate(data);
        if(validationResult.error) {
            errorToast(validationResult.error);
            return
        }

        setAccountData(data);
        setShowModal(true);
    }

    const activateAccount = async () => {
        if(!accountData) {
            errorToast('Something went wrong. Please try again.');
            return
        }
        setLoading(true);

        const res = await client.activateAdminCreatedAccount(accountData);

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
                <AdminModal 
                    show={showModal}
                    setShow={setShowModal}
                    title={'Create Account'}
                    message={`A Contributor account gives you the ability to upload data, links and images to the Cosmic Strains website. Any malicious data, links or images are grounds for account termination. Please treat all customers with respect as you are not only representing your company, but Cosmic Strains as well. Any giveaways featuring or promoting illegal items are strictly prohibited. Do you want to continue?`}
                    action={() => activateAccount()} 
                    actionText={'Confirm'}
                />
                <TermsAndConditions show={showTermsAndConditions} setShow={setShowTermsAndConditions} />
                <MainImage src={logo} alt='Company Logo' height='200px' width='200px' />
                <MainTitle>Activate Account</MainTitle>
                <MainText>Email: { account.email }</MainText>

                <ActivateAccountInput type='text' name='username' value={username} onChange={(e) => tools.usernameInputValidation(e.target.value, setUsername)} placeholder='Username' />
                <InputSubtext margin={'10px 0'}>In order to create a welcoming environment for all, usernames that are hateful, homophobic, racist, sexist, derogatory, harassing, or otherwise uncivil are grounds for account termination.</InputSubtext>
                <AddressBottomContainer>
                    <ActivateAccountInput type={passwordTextVisible ? 'text' : 'password'} name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    {passwordTextVisible ?
                        <FaEyeSlash onClick={() => setPasswordTextVisible(false)} />
                    :
                        <FaEye onClick={() => setPasswordTextVisible(true)} />
                    }
                </AddressBottomContainer>
                <AddressBottomContainer>
                    <ActivateAccountInput type={confirmPasswordTextVisible ? 'text' : 'password'} name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
                    {passwordTextVisible ?
                        <FaEyeSlash onClick={() => setConfirmPasswordTextVisible(false)} />
                    :
                        <FaEye onClick={() => setConfirmPasswordTextVisible(true)} />
                    }
                </AddressBottomContainer>
                <ActivateAccountInput type='text' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
                <ActivateAccountInput type='text' name='lastName'  value={lastName}onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
                <ActivateAccountInput type='text' name='phone'  value={phone} onChange={(e) => tools.phoneInputValidation(e.target.value, setPhone)} placeholder='Phone' />
                <ActivateAccountInput type='text' name='addressOne' value={addressOne} onChange={(e) => setAddressOne(e.target.value)} placeholder='Address Line One' />
                <ActivateAccountInput type='text' name='addressTwo' value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} placeholder='Address Line Two' />
                <AddressBottomContainer>
                    <AddressBottomInput type='text' name='city' value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' />
                    <ActivateAccountSelect name='state' value={state} onChange={(e) => setState(e.target.value)}>
                        <ActivateAccountOption key={0} value={''} disabled> -- State -- </ActivateAccountOption>
                        {tools.states.map((state, index) => 
                            <ActivateAccountOption
                                key={index + 1}
                                value={state.abbreviation}
                            >
                                { state.abbreviation }
                            </ActivateAccountOption>
                        )}
                    </ActivateAccountSelect>
                    <AddressBottomInput type='text' name='zipCode' value={zipCode} onChange={(e) => tools.zipCodeInputValidation(e.target.value, setZipCode)} placeholder='Zip Code' />
                </AddressBottomContainer>
                <TermsContainer>
                  <TermsCheckbox type='checkbox' value={eulaChecked} onChange={(e) => setEulaChecked(e.target.checked)} />
                  <ActivateAccountLabel>I am 21 years of age or older and I accept the <TermsText onClick={() => setShowTermsAndConditions(!showTermsAndConditions)}>Terms and Conditions</TermsText></ActivateAccountLabel>
                </TermsContainer>
                <ButtonContainer>
                    <Button onClick={() => showAccountCreationDisclaimer()}>Activate Account</Button>
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
        </MainContainer>
    )
}

export default ActivateAccountPage;