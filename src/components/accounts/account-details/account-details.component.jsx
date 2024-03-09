import React, { useEffect, useState, useContext } from 'react';

import Address from '../../reusable/address/address.component';
import Button from '../../reusable/button/button.component';
import AdminModal from '../../reusable/admin-modal/admin-modal.component';
import Spinner from '../../reusable/spinner/spinner.component';
import Toasted from '../../reusable/toasted/toasted.component';
import UpdatePassword from '../update-password/update-password.component';

import { UserContext } from '../../../contexts/user.context';

import { tokenName } from '../../../config';

import Client from '../../../tools/client';
import { setMobileView } from '../../../tools/mobileView';
import {
    phoneInputValidation,
    usernameInputValidation
} from '../../../tools/user';

import {
    AccountDetailsContainer,
    AccountDetailsTextContainer,
    AccountEditContainer,
    AccountDetailsSubtitle,
    AccountDetailsInlineTitle,
    AccountDetailsText,
    AccountDetailsTitle,
    AccountAddressContainer,
    AddressBottomContainer,
    AddressContainer,
    AccountDetailsInput,
    DeleteButton,
    TextRowContainer,
    UpdateButtonContainer,
    UpdatePasswordLink
} from './account-details.styles';

const client = new Client();

const AccountDetails = () => {
    const [ loading, setLoading ] = useState(false);
    const [ showEdit, setShowEdit ] = useState(false);
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ billingAddress, setBillingAddress ] = useState({});
    const [ shippingAddress, setShippingAddress ] = useState({});
    const [ showModal, setShowModal ] = useState(false);
    const [ input, setInput ] = useState('');
    const [ showUpdatePassword, setShowUpdatePassword ] = useState(false);
    const [ toastMessage, setToastMessage ] = useState('Account has been created successfully');
    const [ toastError, setToastError ] = useState(false);
    const [ showToast, setShowToast ] = useState(false);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if(currentUser) {
            initializeForm();
        }
    }, [ currentUser ]);

    const getToasted = (toast) => toast();

    const errorToast = (message) => {
        setToastMessage(message);
        setToastError(true);
        setShowToast(true);
    }

    const initializeForm = () => {
        setUsername(currentUser.username);
        setEmail(currentUser.email);
        setPhone(currentUser.phone);
        setFirstName(currentUser.firstName);
        setLastName(currentUser.lastName);
        setBillingAddress(currentUser.billingAddress);
        setShippingAddress(currentUser.shippingAddress);
    }

    const updateBillingAddress = (data) => {
        setBillingAddress({
            ...billingAddress,
            ...data
        });
    }

    const updateShippingAddress = (data) => {
        setShippingAddress({
            ...shippingAddress,
            ...data
        });
    }

    const checkFields = () => {
        if(username === '' ||
            firstName === '' || 
            lastName === '' || 
            phone === '' ||
            phone.length < 10 ||
            billingAddress.addressOne  === '' ||
            billingAddress.city  === '' ||
            billingAddress.zipCode  === '' ||
            shippingAddress.addressOne === '' ||
            shippingAddress.city === '' ||
            shippingAddress.zipCode === '') {
                errorToast('Please fill out all fields to update your account.');
                return false;
        }
        return true;
    }

    const updateUserDetails = async () => {
        if(!checkFields()) {
            return
        }
        const data = {
            username,
            firstName,
            lastName,
            phone,
            billingAddress,
            shippingAddress
        };

        await client.updateAccount(data);
        
        window.location = '/'
    }

    const cancelUpdateUserDetails = () => {
        initializeForm();
        setShowEdit(false);
    }

    const confirmDelete = () => {
        setShowModal(true);
    }

    const closeDeleteModal = () => {
        setInput('');
        setShowModal(false);
        
    }

    const deleteAccount = async () => {
        if(input.toLowerCase() !== email.toLowerCase()) {
            return;
        }
        await client.deleteAccount();
        setLoading(true);
        setShowModal(false);
        localStorage.removeItem(tokenName);
        sessionStorage.removeItem(tokenName);
        window.location.href = '/';
    }

    if(showUpdatePassword) {
        return (
            <UpdatePassword setShowUpdatePassword={setShowUpdatePassword} />
        )
    }

    return (
        <>
            <AdminModal 
                show={showModal}
                setShow={closeDeleteModal}
                title={'Delete Account'} 
                image={''}
                input={input}
                inputPlaceholder={'Email'}
                setInput={setInput}
                message={`Are you sure you want to delete your account forever? This action can not be undone. Please enter the account email to confirm.`}
                action={deleteAccount} 
                actionText={'Confirm'}
            />
            {!currentUser || loading ?
                <Spinner />
                :
                showEdit ?
                    <AccountEditContainer>
                        <AccountDetailsTitle>
                            Update Account
                        </AccountDetailsTitle>
                        <AccountDetailsInput type={'text'} name={'username'} value={username} onChange={(e) => usernameInputValidation(e.target.value, setUsername)} placeholder={'Username'} />
                        <AccountDetailsInput type={'text'} name={'firstName'} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={'First Name'} />
                        <AccountDetailsInput type={'text'} name={'lastName'} value={lastName} onChange={(e) => setLastName(e.target.value)}  placeholder={'Last Name'} />
                        <AccountDetailsInput type={'text'} name={'phone'} value={phone} onChange={(e) => phoneInputValidation(e.target.value, setPhone)} maxLength={12}  placeholder={'Phone'} />
                        <AccountAddressContainer setMobileView={setMobileView()}>
                            <AddressContainer setMobileView={setMobileView()}>
                                <AccountDetailsSubtitle>Billing Address</AccountDetailsSubtitle>
                                <Address address={billingAddress} updateAddress={updateBillingAddress} customSelector={'billingAddress'} />
                            </AddressContainer>
                            <AddressContainer setMobileView={setMobileView()}>
                                <AccountDetailsSubtitle>Shipping Address</AccountDetailsSubtitle>
                                <Address address={shippingAddress} updateAddress={updateShippingAddress} customSelector={'shippingAddress'} />
                            </AddressContainer>
                        </AccountAddressContainer>
                        <UpdateButtonContainer>
                            <Button onClick={() => cancelUpdateUserDetails()}>Cancel</Button>
                            <Button onClick={() => updateUserDetails()}>Submit</Button>
                        </UpdateButtonContainer>
                        <UpdatePasswordLink onClick={() => setShowUpdatePassword(true)}>Update Password</UpdatePasswordLink>
                        {currentUser.roleId > 3 &&
                        <DeleteButton onClick={() => confirmDelete()}>Delete Account</DeleteButton>
                        }
                    </AccountEditContainer>
                :
                    <AccountDetailsContainer>
                        <AccountDetailsTitle>
                            Account Details
                        </AccountDetailsTitle>
                        <AccountDetailsTextContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>Email: </AccountDetailsInlineTitle>
                                <AccountDetailsText id='accountEmail'>{ email }</AccountDetailsText>
                            </TextRowContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>Username: </AccountDetailsInlineTitle>
                                <AccountDetailsText id='accountUsername'>{ username }</AccountDetailsText>
                            </TextRowContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>First Name: </AccountDetailsInlineTitle>
                                <AccountDetailsText id='accountFirstName'>{ firstName }</AccountDetailsText>
                            </TextRowContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>Last Name:</AccountDetailsInlineTitle>
                                <AccountDetailsText id='accountLastName'>{ lastName }</AccountDetailsText>
                            </TextRowContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>Phone:</AccountDetailsInlineTitle>
                                <AccountDetailsText id='accountPhone'>{ phone }</AccountDetailsText>
                            </TextRowContainer>
                            <AccountDetailsSubtitle>Billing Address:</AccountDetailsSubtitle>
                            <AccountDetailsText id='billingAddressOne'>{ billingAddress.addressOne }</AccountDetailsText>
                            {billingAddress.addressTwo &&
                                <AccountDetailsText id='billingAddressTwo'>{ billingAddress.addressTwo }</AccountDetailsText>
                            }
                            <AddressBottomContainer>
                                <AccountDetailsText id='billingAddressCity'>{ billingAddress.city }, </AccountDetailsText>
                                <AccountDetailsText id='billingAddressState'>{ billingAddress.state } </AccountDetailsText>
                                <AccountDetailsText id='billingAddressZipCode'>{ billingAddress.zipCode }</AccountDetailsText>
                            </AddressBottomContainer>
                            <AccountDetailsSubtitle>Shipping Address:</AccountDetailsSubtitle>
                            <AccountDetailsText id='shippingAddressOne'>{ shippingAddress.addressOne }</AccountDetailsText>
                            { shippingAddress.addressTwo &&
                                <AccountDetailsText id='shippingAddressTwo'>{ shippingAddress.addressTwo }</AccountDetailsText>
                            }
                            <AddressBottomContainer>
                                <AccountDetailsText id='shippingAddressCity'>{ shippingAddress.city }, </AccountDetailsText>
                                <AccountDetailsText id='shippingAddressState'>{ shippingAddress.state } </AccountDetailsText>
                                <AccountDetailsText id='shippingAddressZipCode'>{ shippingAddress.zipCode }</AccountDetailsText>
                            </AddressBottomContainer>
                        </AccountDetailsTextContainer>
                        <UpdateButtonContainer>
                            <Button onClick={() => setShowEdit(true)}>Update Account</Button>
                        </UpdateButtonContainer>
                    </AccountDetailsContainer>
                
            }
            <Toasted 
                message={toastMessage}
                showToast={showToast}
                setShowToast={setShowToast}
                getToasted={getToasted}
                error={toastError}
            />
        </>
    );
}

export default AccountDetails;