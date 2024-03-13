import { useContext, useState } from 'react';

import Button from '../../reusable/button/button.component';

import { ToastContext } from '../../../contexts/toast.context.jsx';

import Client from '../../../tools/client.js';
import Tools from '../../../tools/tools.js';

import {
    UpdateInputsContainer,
    UpdatePasswordContainer,
    UpdatePasswordText,
    UpdatePasswordTitle,
    UpdatePasswordSubtitle,
    UpdatePasswordInput
} from './update-password.styles';

const client = new Client();
const tools = new Tools();

const UpdatePassword = ({ setShowUpdatePassword }) => {
    const [ currentPassword, setCurrentPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmNewPassword, setConfirmNewPassword ] = useState('');

    const { errorToast, successToast } = useContext(ToastContext);

    const checkFields = () => {
        if(currentPassword.length === 0 ||
            newPassword.length === 0 ||
            confirmNewPassword.length === 0) {
                errorToast('Please complete all fields to update password');
            return false;
        }
        if(!tools.passwordValidation(newPassword)) {
            errorToast('Password needs to be 8 characters in length or more with at least one number and one special character');
            return false;
        }
        if(newPassword !== confirmNewPassword) {
            errorToast('New password fields do not match');
            return false;
        }
        return true;
    }

    const handlePasswordUpdate = async () => {
        if(!checkFields()) {
            return
        }
        await client.updateAccountPassword({ currentPassword, newPassword });
        
        successToast('Updated Password');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    return (
        <>
            <UpdatePasswordContainer>
                <UpdatePasswordTitle>Update Password</UpdatePasswordTitle>
                <UpdatePasswordSubtitle>Please enter your current password to continue</UpdatePasswordSubtitle>
                <UpdateInputsContainer  onKeyDown={(e) => e.key === 'Enter' ? handlePasswordUpdate() : ''}>
                    <UpdatePasswordInput type={'password'} value={ currentPassword } onChange={(e) => setCurrentPassword(e.target.value)} placeholder={'Current Password'} />
                    <UpdatePasswordInput type={'password'} value={ newPassword } onChange={(e) => setNewPassword(e.target.value)} placeholder={'New Password'} />
                    <UpdatePasswordInput type={'password'} value={ confirmNewPassword } onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder={'Confirm New Password'} />
                </UpdateInputsContainer>
                <Button onClick={() => handlePasswordUpdate()}>Update Password</Button>
                <UpdatePasswordText onClick={() => setShowUpdatePassword(false)}>Cancel</UpdatePasswordText>
            </UpdatePasswordContainer>
        </>
    )
}

export default UpdatePassword;